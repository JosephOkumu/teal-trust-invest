package main

import (
	"crypto/sha256"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"hedera/wallet"
    "hedera/utils"

	"golang.org/x/crypto/bcrypt"
	"golang.org/x/crypto/pbkdf2"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

type User struct {
	ID                  uint   `gorm:"primaryKey"`
	FirstName           string `json:"firstName"`
	LastName            string `json:"lastName"`
	Email               string `gorm:"unique" json:"email"`
	Phone               string `json:"phone"`
	Password            string `json:"password"`
	Hederawallet        string `json:"hederawallet"`
	EncryptedPrivateKey string `json:"encryptedPrivateKey"`
	Salt                string `json:"salt"`
	SymmetricKey        string `json:"symmetricKey"`
}

func init() {
	var err error
	db, err = gorm.Open(sqlite.Open("auth.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	db.AutoMigrate(&User{})
}

func registerHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}
	user.Password = string(hashedPassword)

	// set up Hedera client
	client, err := wallet.SetupClient()
	if err != nil {
		log.Fatalf("error setting up Hedera client: %v", err)
	}

	user1AccountId, userPrivateKey, err := wallet.CreateWallet(client)
	if err != nil {
		log.Fatalf("error creating wallet: %v", err)
	}

	user.Hederawallet = user1AccountId

	// Derive a secure key using PBKDF2
	salt := utils.GenerateSalt(16) // Generate a random salt
	symmetricKey := pbkdf2.Key([]byte(hashedPassword), salt, 100000, 32, sha256.New)

	// Encrypt the private key
	encryptedKey, err := wallet.Encrypt(userPrivateKey, symmetricKey)
	if err != nil {
		log.Fatalf("Error encrypting private key: %v", err)
	}

	user.EncryptedPrivateKey = encryptedKey

	if err != nil {
		log.Fatalf("error creating wallet: %v", err)
	}

	// Save the user to the database
	result := db.Create(&user)
	if result.Error != nil {
		// Check if the error is due to a UNIQUE constraint violation
		if result.Error.Error() == "UNIQUE constraint failed: users.email" {
			http.Error(w, "A user with this email already exists", http.StatusConflict)
			return
		}
		http.Error(w, "Failed to create user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	fmt.Fprintln(w, "User registered successfully")
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var credentials struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	err := json.NewDecoder(r.Body).Decode(&credentials)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	var user User
	result := db.Where("email = ?", credentials.Email).First(&user)
	if result.Error != nil {
		http.Error(w, "Invalid email or password", http.StatusUnauthorized)
		return
	}

	// Compare the provided password with the hashed password
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(credentials.Password))
	if err != nil {
		http.Error(w, "Invalid email or password", http.StatusUnauthorized)
		return
	}

	// If successful, return a success response
	w.WriteHeader(http.StatusOK)
	fmt.Fprintln(w, "Login successful")
}
