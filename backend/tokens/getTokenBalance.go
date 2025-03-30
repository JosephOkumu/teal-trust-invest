package tokens

import (
	"fmt"

	hedera "github.com/hashgraph/hedera-sdk-go/v2"
)

func GetTokenBalance(client *hedera.Client, tokenID hedera.TokenID, accountID hedera.AccountID) (int64, error) {
	// Create an Account Balance Query
	balanceQuery := hedera.NewAccountBalanceQuery().
		SetAccountID(accountID)

	// Execute the query
	balance, err := balanceQuery.Execute(client)
	if err != nil {
		return 0, fmt.Errorf("failed to query account balance: %v", err)
	}

	// Retrieve the token balance for the specified TokenID
	tokenBalance, ok := balance.Token[tokenID]
	if !ok {
		return 0, fmt.Errorf("token ID %s not found in account %s", tokenID.String(), accountID.String())
	}

	return int64(tokenBalance), nil
}