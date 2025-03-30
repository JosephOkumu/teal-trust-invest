package main

import (
	"crypto/rand"
	"crypto/sha256"
	"fmt"
	"log"

	"github.com/hashgraph/hedera-sdk-go/v2"
	"golang.org/x/crypto/pbkdf2"

	"hedera/models"
	"hedera/tokens"
	"hedera/wallet"
)

func main() {
	// set up Hedera client
	client, err := wallet.SetupClient()
	if err != nil {
		log.Fatalf("error setting up Hedera client: %v", err)
	}

	user1AccountId, user1PrivateKey, err := wallet.CreateWallet(client)
	if err != nil {
		log.Fatalf("error creating wallet: %v", err)
	}

	fmt.Println(user1AccountId, user1PrivateKey)

	privateKey := user1PrivateKey
	// encrypt the private key
	// Password or passphrase provided by the user
	password := "my-secure-password"

	// Derive a secure key using PBKDF2
	salt := generateSalt(16) // Generate a random salt
	symmetricKey := pbkdf2.Key([]byte(password), salt, 100000, 32, sha256.New)

	// Encrypt the private key
	encryptedKey, err := wallet.Encrypt(privateKey, symmetricKey)
	if err != nil {
		log.Fatalf("Error encrypting private key: %v", err)
	}
	fmt.Println("Encrypted Private Key:", encryptedKey)

	// Decrypt the private key
	decryptedKey, err := wallet.Decrypt(encryptedKey, symmetricKey)
	if err != nil {
		log.Fatalf("Error decrypting private key: %v", err)
	}
	fmt.Println("Decrypted Private Key:", decryptedKey)

	// Set up treasury account
	treasuryPrivateKey, treasuryPublicKey := wallet.SetUpTreasuryAccount(client)

	token := models.Token{
		Name:        "ExampleToken",
		Symbol:      "EXT",
		Decimals:    2,
		InitialSupply: 0,
		TotalSupply: 0,
	}

	// Create initial token supply
	token = tokens.CreateInitialTokenSupply(client, treasuryPrivateKey, treasuryPublicKey, token)

	// mint tokens on behalf of user1 and transfer to user1
	tokens.MintTokens(client, token.TokenID, 100, token.SupplyKey)

	// transfer tokens from treasury to user1
	user1AccountID, err := hedera.AccountIDFromString(user1AccountId)
	if err != nil {
		log.Fatalf("Error converting user1 account ID: %v", err)
	}
	err = tokens.TransferTokensFromTreasuryToUser(client, token.TokenID, 10, treasuryPrivateKey, user1AccountID, user1PrivateKey, treasuryPublicKey)
	if err != nil {
		log.Printf("Error transferring tokens from treasury to user1: %v", err)
	}

	balance, err := tokens.GetTokenBalance(client, token.TokenID, treasuryPublicKey)
	if err != nil {
		log.Fatalf("Error getting token balance: %v", err)
	}
	fmt.Printf("Treasury Token Balance: %d\n", balance)
	// Check token balance for user1
	balance, err = tokens.GetTokenBalance(client, token.TokenID, user1AccountID)
	if err != nil {
		log.Fatalf("Error getting token balance: %v", err)
	}
	fmt.Printf("User1 Token Balance: %d\n", balance)



}

// Function to generate a random salt
func generateSalt(length int) []byte {
	salt := make([]byte, length)
	_, err := rand.Read(salt)
	if err != nil {
		log.Fatalf("Error generating salt: %v", err)
	}
	return salt
}
