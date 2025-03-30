package utils

import (
	"crypto/rand"
	"log"
)

// Function to generate a random salt
func GenerateSalt(length int) []byte {
	salt := make([]byte, length)
	_, err := rand.Read(salt)
	if err != nil {
		log.Fatalf("Error generating salt: %v", err)
	}
	return salt
}
