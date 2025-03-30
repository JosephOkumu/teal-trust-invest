package wallet

import (
	"fmt"
	"log"
	"os"

	hedera "github.com/hashgraph/hedera-sdk-go/v2"
	"github.com/joho/godotenv"
)



func SetupClient() (*hedera.Client, error) {
	// retrieve the private key from .env file using doho/dotenv package
	err := godotenv.Load()
	if err != nil {
		return nil, fmt.Errorf("error loading .env file: %v", err)
	}

	privateKey := os.Getenv("HEDERA_PRIVATE_KEY")
	if privateKey == "" {
		return nil, fmt.Errorf("HEDERA_PRIVATE_KEY not set in .env file")
	}

	operatorIDStr := os.Getenv("HEDERA_CLIENT_ID")
	if operatorIDStr == "" {
		return nil, fmt.Errorf("HEDERA_CLIENT_ID not set in .env file")
	}

	client := hedera.ClientForTestnet() // Use ClientForMainnet() for production
	// Operator account ID and private key from string value
	operatorID, err := hedera.AccountIDFromString(operatorIDStr)
	if err != nil {
		panic(err)
	}

	operatorKey, err := hedera.PrivateKeyFromString(privateKey)
	if err != nil {
		return nil, err
	}
	client.SetOperator(operatorID, operatorKey)
	return client, nil
}

func CreateWallet(client *hedera.Client) (string, string, error) {
	privateKey, err := hedera.GeneratePrivateKey()
	if err != nil {
		return "", "", err
	}
	publicKey := privateKey.PublicKey()

	// Create a new account without specifying an initial balance
	transaction, err := hedera.NewAccountCreateTransaction().
		SetKey(publicKey).
		Execute(client)
	if err != nil {
		return "", "", err
	}

	receipt, err := transaction.GetReceipt(client)
	if err != nil {
		return "", "", err
	}

	return receipt.AccountID.String(), privateKey.String(), nil
}

func SetUpTreasuryAccount(client *hedera.Client) (hedera.PrivateKey, hedera.AccountID){
	// Generate Treasury Account Keys
	treasuryPrivateKey, err := hedera.GeneratePrivateKey()
	if err != nil {
		log.Fatalf("Failed to generate treasury private key: %v", err)
	}
	treasuryPublicKey := treasuryPrivateKey.PublicKey()

	// Create the Treasury Account
	treasuryAccountTx, err := hedera.NewAccountCreateTransaction().
		SetKey(treasuryPublicKey).
		SetInitialBalance(hedera.HbarFromTinybar(1000)).
		Execute(client)
	if err != nil {
		log.Fatalf("Failed to create treasury account: %v", err)
	}

	treasuryAccountReceipt, err := treasuryAccountTx.GetReceipt(client)
	if err != nil {
		log.Fatalf("Failed to get treasury account receipt: %v", err)
	}

	treasuryAccountID := *treasuryAccountReceipt.AccountID
	fmt.Printf("Treasury Account Created: %s\n", treasuryAccountID)

	return treasuryPrivateKey, treasuryAccountID
}


