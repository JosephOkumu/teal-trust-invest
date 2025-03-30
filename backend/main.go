package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/rs/cors"

	"hedera/models"
	"hedera/tokens"
	"hedera/wallet"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/register", registerHandler)
	mux.HandleFunc("/login", loginHandler)

	// Enable CORS
	handler := cors.Default().Handler(mux)

	// set up Hedera client
	client, err := wallet.SetupClient()
	if err != nil {
		log.Fatalf("error setting up Hedera client: %v", err)
	}

	// Decrypt the private key
	// decryptedKey, err := wallet.Decrypt(encryptedKey, symmetricKey)
	// if err != nil {
	// 	log.Fatalf("Error decrypting private key: %v", err)
	// }
	// fmt.Println("Decrypted Private Key:", decryptedKey)

	// Set up treasury account
	treasuryPrivateKey, treasuryPublicKey := wallet.SetUpTreasuryAccount(client)

	token := models.Token{
		Name:          "ExampleToken",
		Symbol:        "EXT",
		Decimals:      2,
		InitialSupply: 0,
		TotalSupply:   0,
	}

	// Create initial token supply
	token = tokens.CreateInitialTokenSupply(client, treasuryPrivateKey, treasuryPublicKey, token)

	// mint tokens on behalf of user1 and transfer to user1
	tokens.MintTokens(client, token.TokenID, 100, token.SupplyKey)

	fmt.Println("Server is running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
