# EarnX

A Web3-native freelance platform that connects freelancers with on-chain gigs, bounties, and projects. Built on Ethereum Sepolia testnet with smart contract escrow, programmable trust, and transparent reward systems.

## Overview

EarnX revolutionizes the freelance economy by leveraging blockchain technology to create a transparent, secure, and efficient marketplace. The platform eliminates traditional middlemen, reduces fees, and ensures fair payment distribution through smart contracts.

## Features

### Bounty System
- Competitive bounty competitions where multiple freelancers can submit work
- USDT-based payments with secure escrow
- Dynamic prize distribution based on quality
- Category-based organization (Content, Development, Design, Research, Marketing)
- Automated deadline enforcement with penalty systems
- Winner selection and prize distribution

### Freelance Escrow
- Smart contract escrow for secure payment holding
- Freelancer staking mechanism to demonstrate commitment
- Detailed proposal system with IPFS metadata storage
- Automatic proposal expiration for time-sensitive projects
- Work approval and payment release workflow
- Minimal platform fee (2.5%)

### Security Features
- Reentrancy protection using OpenZeppelin libraries
- Ownership controls for platform management
- Penalty distribution for cancelled projects
- On-chain verification of all transactions
- Secure wallet integration with multiple providers

## Technology Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Radix UI** - Accessible component primitives
- **Wagmi** - React hooks for Ethereum
- **Viem** - TypeScript Ethereum library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Type-safe database client
- **PostgreSQL** - Database storage
- **Pinata** - IPFS storage for metadata

### Blockchain
- **Solidity 0.8.19** - Smart contract development
- **OpenZeppelin** - Secure contract libraries
- **Hardhat** - Development environment
- **Ethereum Sepolia** - Testnet deployment

## Network Configuration

- **Network**: Ethereum Sepolia Testnet
- **Chain ID**: 11155111
- **RPC URL**: https://rpc.sepolia.org
- **Block Explorer**: https://sepolia.etherscan.io
- **Native Currency**: ETH
- **Payment Token**: USDT (Mock ERC20)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm, yarn, pnpm, or bun
- MetaMask or compatible Web3 wallet
- PostgreSQL database (for user data)
- Sepolia ETH for gas fees

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd EarnX
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/earnx"
   
   # Frontend
   NEXT_PUBLIC_CHAIN_ID=11155111
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="your-walletconnect-project-id"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   
   # API Keys
   token="your-web3-career-api-token"
   
   # Pinata (for IPFS)
   PINATA_API_KEY="your-pinata-api-key"
   PINATA_SECRET_KEY="your-pinata-secret-key"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate --schema=db/prisma/schema.prisma
   npx prisma migrate dev --schema=db/prisma/schema.prisma
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Smart Contracts

### Bounty Contract
- Manages competitive bounty competitions
- Handles USDT payments and prize distribution
- Implements deadline enforcement and penalty systems
- Supports multiple categories and submission tracking

### Freelance Contract
- Escrow system for freelance projects
- Staking mechanism for freelancer commitment
- Proposal management and selection process
- Automated deadline handling and fund release

### USDT Token (Mock)
- ERC20 stablecoin used for all payments
- Deployed on Sepolia testnet for testing

## Project Structure

```
EarnX/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # UI components
│   └── freelance/        # Freelance-specific components
├── contracts/            # Solidity smart contracts
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── db/                   # Database schema and client
├── scripts/              # Deployment scripts
└── public/               # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run compile` - Compile smart contracts
- `npm run test` - Run Hardhat tests
- `npm run deploy:all:sepolia` - Deploy all contracts to Sepolia
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:studio` - Open Prisma Studio

## Usage

### For Clients

1. Connect your Web3 wallet
2. Navigate to the dashboard
3. Post a bounty or freelance gig with detailed requirements
4. Fund the escrow with USDT
5. Review proposals and select the best fit
6. Approve completed work to release payment

### For Freelancers

1. Connect your wallet and complete onboarding
2. Browse available bounties and freelance gigs
3. Submit detailed proposals with evidence
4. Complete work and deliver results
5. Receive secure payments through smart contract escrow

## Development

### Contract Deployment

Deploy contracts to Sepolia testnet:

```bash
# Deploy all contracts
npm run deploy:all:sepolia

# Deploy individual contracts
npm run deploy:usdt:sepolia
npm run deploy:bounty:sepolia
npm run deploy:freelance:sepolia
```

### Database Management

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npx prisma migrate dev --schema=db/prisma/schema.prisma

# Open Prisma Studio
npm run prisma:studio
```

## Security Considerations

- All smart contracts use OpenZeppelin's battle-tested libraries
- Reentrancy guards protect against common attack vectors
- Ownership controls limit admin functions
- All user funds are held in escrow until work completion
- Platform fees are minimal and transparent

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues, questions, or contributions, please open an issue on the GitHub repository.

---

Built with Next.js, Solidity, and Web3 technologies.
