package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"

    "github.com/rs/cors"
    "golang.org/x/crypto/bcrypt"
    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
)

var db *gorm.DB

type User struct {
    ID        uint   `gorm:"primaryKey"`
    FirstName string `json:"firstName"`
    LastName  string `json:"lastName"`
    Email     string `gorm:"unique" json:"email"`
    Phone     string `json:"phone"`
    Password  string `json:"password"`
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

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/register", registerHandler)

    // Enable CORS
    handler := cors.Default().Handler(mux)

    fmt.Println("Server is running on http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", handler))
}