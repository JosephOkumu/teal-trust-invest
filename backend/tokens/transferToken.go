package tokens

import (
	"fmt"

	"github.com/hashgraph/hedera-sdk-go/v2"
)

func TransferTokens(client *hedera.Client, tokenID hedera.TokenID, senderPrivateKey, recipientAccount string, amount int64) error {
	privateKey, err := hedera.PrivateKeyFromString(senderPrivateKey)
	if err != nil {
		return err
	}

	hederaAccountID, err := hedera.AccountIDFromString(client.GetOperatorAccountID().String())
	if err != nil {
		return err
	}
	recepientAccountID, err := hedera.AccountIDFromString(recipientAccount)
	if err != nil {
		return err
	}
	transferTx, err := hedera.NewTransferTransaction().
		AddTokenTransfer(tokenID, hederaAccountID, -amount).
		AddTokenTransfer(tokenID, recepientAccountID, amount).
		FreezeWith(client)
	if err != nil {
		return err
	}

	signedTx := transferTx.Sign(privateKey)
	_, err = signedTx.Execute(client)
	return err
}

func TransferTokensFromTreasuryToUser(client *hedera.Client, tokenID hedera.TokenID, amount int64, treasuryPrivateKey hedera.PrivateKey, recipientAccountID hedera.AccountID, recipientPrivateKey string, treasuryAccountID hedera.AccountID) error {
	// Step 1: Check the treasury account's token balance
	
	treasuryBalance, err := GetTokenBalance(client, tokenID, treasuryAccountID)
	if err != nil {
		return fmt.Errorf("failed to retrieve treasury account balance: %v", err)
	}

	if treasuryBalance < amount {
		return fmt.Errorf("insufficient token balance in treasury account: available %d, required %d", treasuryBalance, amount)
	}
	// Step 1: Associate the token with the recipient account (if not already associated)
	associateTx, err := hedera.NewTokenAssociateTransaction().
		SetAccountID(recipientAccountID).
		SetTokenIDs(tokenID).
		FreezeWith(client)
	if err != nil {
		return fmt.Errorf("failed to create token associate transaction: %v", err)
	}

	// Sign the transaction with the recipient account's private key
	// Derive the recipient's private key
	hederaRecipientPrivateKey, err := hedera.PrivateKeyFromString(recipientPrivateKey)
	if err != nil {
		return fmt.Errorf("failed to derive recipient private key: %v", err)
	}
	associateTx = associateTx.Sign(hederaRecipientPrivateKey)

	// Execute the association transaction
	associateResponse, err := associateTx.Execute(client)
	if err != nil {
		return fmt.Errorf("at execute failed to execute token associate transaction: %v", err)
	}

	// Get the receipt to ensure the association was successful
	associateReceipt, err := associateResponse.GetReceipt(client)
	if err != nil {
		return fmt.Errorf("at receipt failed to get token associate transaction receipt: %v", err)
	}
	if associateReceipt.Status != hedera.StatusSuccess {
		return fmt.Errorf("token associate transaction failed with status: %v", associateReceipt.Status)
	}

	// Create the Token Transfer Transaction
	tokenTransferTx, err := hedera.NewTransferTransaction().
		AddTokenTransfer(tokenID, client.GetOperatorAccountID(), -amount). // Treasury sends tokens (negative value)
		AddTokenTransfer(tokenID, recipientAccountID, amount).             // Recipient receives tokens (positive value)
		FreezeWith(client)
	if err != nil {
		return fmt.Errorf("failed to create token transfer transaction: %v", err)
	}

	// Sign the transaction with the treasury account private key
	signedTx := tokenTransferTx.Sign(treasuryPrivateKey)

	// Execute the transaction
	txResponse, err := signedTx.Execute(client)
	if err != nil {
		return fmt.Errorf("failed to execute token transfer transaction: %v", err)
	}

	// Get the transaction receipt to ensure it was successful
	receipt, err := txResponse.GetReceipt(client)
	if err != nil {
		return fmt.Errorf("failed to get transaction receipt: %v", err)
	}

	// Check the status of the transaction
	if receipt.Status != hedera.StatusSuccess {
		return fmt.Errorf("token transfer transaction failed with status: %v", receipt.Status)
	}

	fmt.Printf("Successfully transferred %d tokens of TokenID %s to AccountID %s\n", amount, tokenID.String(), recipientAccountID.String())
	return nil
}
