# 🚀 EarnX – Web3 Freelance, Gigs & Bounties

> **A Web3-native home for freelancers in a $1.5T+ market.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-earnx.vercel.app-blue?style=for-the-badge&logo=vercel)](https://earnx.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.19-363636?style=for-the-badge&logo=solidity)](https://soliditylang.org/)

![image](https://github.com/user-attachments/assets/63de5104-979f-46b4-aa6f-23b9efba61cd)



EarnX is a Web3-native platform that connects freelancers with on-chain gigs, bounties, and projects in the **$1.5T+ global freelance economy**. Smart-contract escrow, programmable trust, and transparent rewards replace Web2 middlemen and opaque platforms, so more value flows directly between clients and talent.

## ✨ Features

### 🎯 **Bounty System**
Contract Address: 0x0caE75a45201304d6b45541BCeF12bd3ee787e28
- **Competitive Bounties**: Post tasks and let multiple freelancers compete
- **USDT Payments**: Secure payments using USDT stablecoin
- **Dynamic Prize Distribution**: Flexible reward allocation based on quality
- **Category-based Organization**: Content, Development, Design, Research, Marketing, and more
- **Deadline Management**: Automated deadline enforcement with penalty systems

### 💼 **Freelance Escrow**
- **Smart Contract Escrow**: Secure payment holding until work completion
- **Staking Mechanism**: Freelancers stake native tokens to demonstrate commitment
- **Proposal System**: Detailed project proposals with evidence tracking
- **Auto-expiration**: Automatic proposal expiration for time-sensitive projects
- **Platform Fee**: Minimal 2.5% fee (only gas fees beyond this)

### 🔐 **Security & Trust**
- **Reentrancy Protection**: Secure smart contracts with OpenZeppelin
- **Ownership Controls**: Admin functions for platform management
- **Penalty Systems**: Fair penalty distribution for cancelled projects
- **On-chain Verification**: All transactions and agreements recorded on blockchain

### 🎨 **Modern UI/UX**
- **Responsive Design**: Beautiful interface that works on all devices
- **Smooth Animations**: Framer Motion powered interactions
- **Dark Theme**: Eye-friendly dark mode interface
- **Wallet Integration**: Seamless Web3 wallet connection
- **Real-time Updates**: Live status updates and notifications

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **Radix UI** - Accessible component primitives
- **Wagmi** - React hooks for Ethereum
- **Lucide React** - Beautiful icons

### Backend & Database
- **Prisma** - Type-safe database client
- **PostgreSQL** - Reliable database storage
- **Next.js API Routes** - Serverless API endpoints

### Blockchain
- **Solidity 0.8.19** - Smart contract development
- **OpenZeppelin** - Secure contract libraries
- **USDT Integration** - Stablecoin payments
- **Ethereum Sepolia** - Testnet deployment

### Development Tools
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **Turbopack** - Fast development builds

## 🌐 Blockchain Deployment Details

### 🌐 Main Network

- **Chain**: Ethereum Sepolia Testnet
- **RPC URL**: [`https://rpc.sepolia.org`](https://rpc.sepolia.org)
- **Chain ID**: `11155111`
- **Currency**: ETH
- **Explorer**: [https://sepolia.etherscan.io](https://sepolia.etherscan.io)
- **Deployed**: December 22, 2025


## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- MetaMask or any Web3 wallet
- USDT tokens for payments

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Debanjannnn/ForkWrok.git
   cd ForkWrok
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your configuration:
   ```env
   DATABASE_URL="your-database-url"
   NEXT_PUBLIC_CONTRACT_ADDRESS="your-contract-address"
   NEXT_PUBLIC_USDT_ADDRESS="your-usdt-contract-address"
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How It Works

### For Clients
1. **Connect Wallet** - Link your Web3 wallet to the platform
2. **Post Project** - Create a bounty or freelance gig with detailed requirements
3. **Fund Escrow** - Deposit USDT to secure the payment
4. **Review Proposals** - Evaluate freelancer submissions and select the best fit
5. **Approve Work** - Review completed work and release payment

### For Freelancers
1. **Complete Onboarding** - Connect wallet and link professional profiles
2. **Build Reputation** - Complete tasks to establish on-chain credibility
3. **Browse Opportunities** - Find bounties and freelance gigs that match your skills
4. **Submit Proposals** - Create detailed proposals with evidence and timelines
5. **Deliver Quality Work** - Complete projects and receive secure payments

## 🔧 Smart Contracts

### Bounty Contract (`Bounty.sol`)
- Contract Address: [0x69be51D117e4f917BbBB2b19d30b77eAC48F8b21](https://sepolia.etherscan.io/address/0x69be51D117e4f917BbBB2b19d30b77eAC48F8b21)
- Manages competitive bounty competitions
- Handles USDT payments and prize distribution
- Implements deadline enforcement and penalty systems
- Supports multiple categories and submission tracking

### Freelance Contract (`Freelance.sol`)
- Contract Address: [0x15c6425E64659D3bf9d1A7131E3b921953E1e62f](https://sepolia.etherscan.io/address/0x15c6425E64659D3bf9d1A7131E3b921953E1e62f)
- Escrow system for freelance projects
- Staking mechanism for freelancer commitment
- Proposal management and selection process
- Automated deadline handling and fund release

### USDT Token (Mock)
- Token Address: [0x52708D2EbB14ADc9df57e02aCAbDC258945daeE2](https://sepolia.etherscan.io/address/0x52708D2EbB14ADc9df57e02aCAbDC258945daeE2)
- ERC20 stablecoin used for all payments on the platform
  

## 🌟 Key Benefits

### For Freelancers
- **No Platform Fees**: Keep 100% of your earnings (minus gas fees)
- **Secure Payments**: Smart contract escrow ensures payment security
- **Reputation Building**: On-chain reputation system for credibility
- **Flexible Work**: Choose from bounties, gigs, or staked projects
- **Global Access**: Work with clients worldwide without borders

### For Clients
- **Quality Assurance**: Staking mechanism ensures freelancer commitment
- **Transparent Process**: All transactions visible on blockchain
- **Cost Effective**: Minimal fees compared to traditional platforms
- **Secure Escrow**: Funds held safely until work completion
- **Multiple Options**: Bounty competitions or direct hiring

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [fork-your-work.vercel.app/](https://fork-your-work.vercel.app/)
- **GitHub Repository**: [github.com/manovHacksaw/fork-your-work](https://github.com/manovHacksaw/fork-your-work)
- **Documentation**: [Coming Soon]

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Smart contracts powered by [OpenZeppelin](https://openzeppelin.com/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

---

**Fork Work** - Revolutionizing the future of work, one smart contract at a time. 🚀

*The only cut taken? Your gas fees.*
# fork-your-work
