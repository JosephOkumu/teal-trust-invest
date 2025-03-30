package tokens

import (
	"fmt"
	"log"

	"github.com/hashgraph/hedera-sdk-go/v2"
	"hedera/models"
)

func CreateInitialTokenSupply(client *hedera.Client, treasuryPrivateKey hedera.PrivateKey, treasuryAccountID hedera.AccountID, token models.Token) models.Token {
	// Create a Token with the Treasury Account and Supply Key
	supplyPrivateKey, err := hedera.GeneratePrivateKey()
	if err != nil {
		log.Fatalf("Failed to generate supply private key: %v", err)
	}

	tokenCreateTx, err := hedera.NewTokenCreateTransaction().
		SetTokenName(token.Name).
		SetTokenSymbol(token.Symbol).
		SetTreasuryAccountID(treasuryAccountID).
		SetInitialSupply(uint64(token.InitialSupply)). // No initial supply, mint later
		SetDecimals(uint(token.Decimals)).
		SetSupplyKey(supplyPrivateKey.PublicKey()).
		FreezeWith(client)
	if err != nil {
		log.Fatalf("Failed to create token: %v", err)
	}

	// Sign the transaction with the treasury account key
	signedTokenCreateTx := tokenCreateTx.Sign(treasuryPrivateKey)

	// Execute the transaction
	tokenCreateResponse, err := signedTokenCreateTx.Execute(client)
	if err != nil {
		log.Fatalf("Failed to execute token creation transaction: %v", err)
	}

	tokenCreateReceipt, err := tokenCreateResponse.GetReceipt(client)
	if err != nil {
		log.Fatalf("Failed to get token creation receipt: %v", err)
	}

	tokenID := *tokenCreateReceipt.TokenID
	fmt.Printf("Token Created: %s\n", tokenID)

	token.TokenID = tokenID
	token.SupplyKey = supplyPrivateKey

	return token

}

// Mint Tokens Function
func MintTokens(client *hedera.Client, tokenID hedera.TokenID, amount uint64, supplyPrivateKey hedera.PrivateKey) error {
	mintTx, err := hedera.NewTokenMintTransaction().
		SetTokenID(tokenID).
		SetAmount(amount).
		FreezeWith(client)
	if err != nil {
		return fmt.Errorf("error creating token mint transaction: %v", err)
	}

	// Sign with the supply key
	signedTx := mintTx.Sign(supplyPrivateKey)

	// Execute the transaction
	txResponse, err := signedTx.Execute(client)
	if err != nil {
		return fmt.Errorf("error executing mint transaction: %v", err)
	}

	// Verify receipt
	receipt, err := txResponse.GetReceipt(client)
	if err != nil {
		return fmt.Errorf("error getting transaction receipt: %v", err)
	}

	if receipt.Status != hedera.StatusSuccess {
		return fmt.Errorf("mint transaction failed with status: %v", receipt.Status)
	}

	fmt.Printf("Minted %d tokens for Token ID %s\n", amount, tokenID)
	return nil
}
