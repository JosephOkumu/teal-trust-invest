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
