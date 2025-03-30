package models

import "github.com/hashgraph/hedera-sdk-go/v2"

type Token struct {
	TokenID     hedera.TokenID
	Name   string
	Symbol string
	Decimals    int
	InitialSupply      int64
	TotalSupply int64
	SupplyKey   hedera.PrivateKey
}
