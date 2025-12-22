# Ethereum Sepolia Migration Guide

## Overview

This guide will help you deploy the EarnX smart contracts to Ethereum Sepolia testnet. The project now supports both **Ethereum Sepolia** and **U2U Solaris Mainnet**.

## Prerequisites

### 1. Get Sepolia ETH (Free)

You need Sepolia ETH to pay for gas fees. Get free testnet ETH from these faucets:

- **Alchemy Faucet**: https://www.alchemy.com/faucets/ethereum-sepolia
- **Sepolia Faucet**: https://sepoliafaucet.com/
- **QuickNode Faucet**: https://faucet.quicknode.com/ethereum/sepolia

> **Note**: You'll need around 0.1 Sepolia ETH for deploying all three contracts.

### 2. Get Etherscan API Key (Free)

For contract verification on Sepolia Etherscan:

1. Go to https://etherscan.io/
2. Create an account (if you don't have one)
3. Navigate to: **My Profile** → **API Keys**
4. Click **Add** to create a new API key
5. Copy your API key

### 3. Set Up Environment Variables

1. Copy the environment template:
   ```bash
   cp env.template .env
   ```

2. Edit `.env` file and add:
   ```bash
   # Your wallet private key (from MetaMask)
   PRIVATE_KEY=0x...your_private_key_here...
   
   # Etherscan API key (for contract verification)
   ETHERSCAN_API_KEY=your_etherscan_api_key_here
   
   # Optional: Custom Sepolia RPC (uses public RPC if not set)
   SEPOLIA_RPC_URL=https://rpc.sepolia.org
   ```

> **⚠️ SECURITY WARNING**: Never commit your `.env` file to version control! It's already in `.gitignore`.

## Deployment Steps

### Option 1: Deploy All Contracts at Once (Recommended)

```bash
npm run deploy:all:sepolia
```

This will deploy:
1. **MockUSDT** - Test USDT token
2. **Allin1Bounty** - Bounty platform contract
3. **FreelanceGigEscrow** - Freelance gig escrow contract

### Option 2: Deploy Contracts Individually

```bash
# Deploy USDT token
npm run deploy:usdt:sepolia

# Deploy Bounty contract
npm run deploy:bounty:sepolia

# Deploy Freelance contract
npm run deploy:freelance:sepolia
```

## After Deployment

### 1. Check Deployment Files

Deployment information is saved in `./deployments/`:
- `complete-deployment.json` - All contract addresses and details
- `USDT-deployment.json` - USDT token details
- `Bounty-deployment.json` - Bounty contract details
- `Freelance-deployment.json` - Freelance contract details

### 2. Verify Contracts on Etherscan

Verify the MockUSDT contract:
```bash
npx hardhat verify --network sepolia <USDT_ADDRESS>
```

Verify the Bounty contract:
```bash
npx hardhat verify --network sepolia <BOUNTY_ADDRESS> <USDT_ADDRESS>
```

Verify the Freelance contract:
```bash
npx hardhat verify --network sepolia <FREELANCE_ADDRESS> <USDT_ADDRESS>
```

Replace `<USDT_ADDRESS>`, `<BOUNTY_ADDRESS>`, and `<FREELANCE_ADDRESS>` with the actual addresses from your deployment files.

### 3. View on Sepolia Etherscan

After deployment, you can view your contracts at:
- **Sepolia Etherscan**: https://sepolia.etherscan.io/address/YOUR_CONTRACT_ADDRESS

## Network Configuration

The project is configured with the following networks:

| Network | Chain ID | RPC URL | Explorer |
|---------|----------|---------|----------|
| **Sepolia** | 11155111 | https://rpc.sepolia.org | https://sepolia.etherscan.io |
| **U2U Solaris** | 39 | https://rpc-mainnet.u2u.xyz | https://u2uscan.xyz |
| **Localhost** | 31337 | http://127.0.0.1:8545 | - |

## Troubleshooting

### Error: "Insufficient funds"
- Make sure you have enough Sepolia ETH in your wallet
- Get more from the faucets listed above

### Error: "Invalid API Key"
- Check that your `ETHERSCAN_API_KEY` is correct in `.env`
- Make sure you're using an Etherscan API key (not a U2U explorer key)

### Error: "Network not found"
- Make sure you're using the correct network flag: `--network sepolia`
- Check that `hardhat.config.js` has the Sepolia network configured

### Compilation Issues
```bash
# Clean and recompile
npx hardhat clean
npx hardhat compile
```

## Contract Addresses

After deployment, update your frontend with the new contract addresses:

```typescript
// lib/contracts.ts or similar
export const CONTRACTS = {
  USDT: "0x...", // From USDT-deployment.json
  BOUNTY: "0x...", // From Bounty-deployment.json
  FREELANCE: "0x...", // From Freelance-deployment.json
};
```

## Additional Resources

- **Sepolia Faucets**: https://faucetlink.to/sepolia
- **Hardhat Documentation**: https://hardhat.org/docs
- **Etherscan API Docs**: https://docs.etherscan.io/
- **MetaMask Setup**: https://metamask.io/

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the deployment logs in your terminal
3. Check the `deployments/` folder for deployment details
4. Verify your `.env` configuration

---

**Happy Deploying! 🚀**
