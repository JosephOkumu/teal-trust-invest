// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@hashgraph/hedera-token-service/contracts/HTS.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract InvestmentBroker is Ownable {
    using HTS for uint256;

    // Hedera Token Service (HTS) Token ID
    address public immutable htsTokenId;

    // Treasury Wallet Address
    address public treasuryWalletAddress;

    // Profit Account Address (for storing commissions)
    address public profitAccount;

    // Customer Contribution Mapping
    mapping(address => uint256[]) customerContributionsMap;

    // Transaction History Details
    struct TxHistory {
        string txHash;
        uint256 amountSent;
        bool isWithdrawal;
    }

    mapping(uint256 => TxHistory) transactionHistories;

    event InvestmentContributionMade(
        address indexed investor,
        uint256 contributionAmount,
        string txHash
    );

    event AutomatedDividendDistribution(
        address indexed shareholder,
        uint256 dividendAmount
    );

    event CommissionDeducted(
        address indexed from,
        uint256 commissionAmount,
        bool isWithdrawal
    );

    constructor(
        string memory _htsTokenIdString,
        address _treasuryWalletAddress,
        address _profitAccount
    ) public {
        htsTokenId = HTS.stringToHTSTokenID(_htsTokenIdString);
        treasuryWalletAddress = _treasuryWalletAddress;
        profitAccount = _profitAccount;
    }

    /**
     * @dev Allows customers to send investment contributions to the broker.
     * Deducts a 20% commission and sends it to the profit account.
     */
    function makeInvestmentContribution(uint256 contributionAmount)
        external
        payable
    {
        require(contributionAmount > 0, "Invalid Contribution Amount");

        // Calculate the 20% commission
        uint256 commission = (contributionAmount * 20) / 100;
        uint256 netContribution = contributionAmount - commission;

        // Transfer the commission to the profit account
        HTS.transferToken(htsTokenId, msg.sender, profitAccount, commission);

        // Transfer the remaining amount to the treasury wallet
        HTS.transferToken(
            htsTokenId,
            msg.sender,
            treasuryWalletAddress,
            netContribution
        );

        customerContributionsMap[msg.sender].push(netContribution);

        string memory txHash = string(
            abi.encodePacked(msg.sender, block.timestamp)
        );
        transactionHistories[
            uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp)))
        ].txHash = txHash;

        emit InvestmentContributionMade(msg.sender, netContribution, txHash);
        emit CommissionDeducted(msg.sender, commission, false);
    }

    /**
     * @dev Allows customers to withdraw their contributions.
     * Deducts a 20% commission and sends it to the profit account.
     */
    function clientWithdrawal(uint256 withdrawalAmount) external {
        require(withdrawalAmount > 0, "Invalid Withdrawal Amount");

        // Check if the customer has sufficient balance in the treasury wallet
        uint256 currentBalance = HTS.balanceOf(
            htsTokenId,
            treasuryWalletAddress
        );

        require(
            currentBalance >= withdrawalAmount,
            "Insufficient Balance in Treasury"
        );

        // Calculate the 20% commission
        uint256 commission = (withdrawalAmount * 20) / 100;
        uint256 netWithdrawal = withdrawalAmount - commission;

        // Transfer the commission to the profit account
        HTS.transferToken(htsTokenId, treasuryWalletAddress, profitAccount, commission);

        // Transfer the remaining amount to the customer
        HTS.transferToken(
            htsTokenId,
            treasuryWalletAddress,
            msg.sender,
            netWithdrawal
        );

        // Update transaction history details
        string memory txHash = string(
            abi.encodePacked(msg.sender, block.timestamp)
        );
        transactionHistories[
            uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp)))
        ].txHash = txHash;
        transactionHistories[
            uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp)))
        ].amountSent = withdrawalAmount;
        transactionHistories[
            uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp)))
        ].isWithdrawal = true;

        // Perform automated dividend distribution
        automateDividendDistribution();

        emit CommissionDeducted(msg.sender, commission, true);
    }

    /**
     * @dev Automates the process of distributing dividends to shareholders.
     */
    function automateDividendDistribution() internal {
        // Calculate total contributions and dividend ratio
        uint256[] memory customerContributions = customerContributionsMap[
            msg.sender
        ];

        uint256 totalContributionAmount = 0;
        for (uint256 i; i < customerContributions.length; i++) {
            totalContributionAmount += customerContributions[i];
        }

        // Calculate each shareholder's dividend amount
        uint256[] memory shareholderDividend = new uint256[](
            customerContributionsMap[msg.sender].length
        );

        for (uint256 j = 0; j < customerContributionsMap[msg.sender].length; j++) {
            shareholderDividend[j] =
                (totalContributionAmount *
                    HTS.balanceOf(htsTokenId, treasuryWalletAddress)) /
                totalContributionAmount;
        }

        // Distribute dividends to each shareholder
        for (uint256 k = 0; k < customerContributionsMap[msg.sender].length; k++) {
            emit AutomatedDividendDistribution(
                msg.sender,
                shareholderDividend[k]
            );

            HTS.transferToken(
                htsTokenId,
                treasuryWalletAddress,
                msg.sender,
                shareholderDividend[k]
            );
        }
    }
}