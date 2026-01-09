<div align="center">

# 🏆 Code Vault

### *Decentralized Marketplace for Premium Code & Developer Bounties*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Movement](https://img.shields.io/badge/Movement-Blockchain-blue)](https://movementlabs.xyz/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

**Discover • Share • Monetize • Build**

[Live Demo](#) • [Documentation](#) • [Report Bug](https://github.com/your-repo/issues) • [Request Feature](https://github.com/your-repo/issues)

</div>

---

## ✨ What is Code Vault?

**Code Vault** is a next-generation decentralized marketplace where developers can:
- 🛍️ **Buy & Sell** premium code repositories
- 🏆 **Launch Bounties** for bug fixes, features, and code challenges
- 💰 **Earn Crypto** by contributing to open-source projects
- 🔒 **Trustless Payments** with blockchain-backed rewards
- 🎯 **Discover Talent** through code submissions and leaderboards

Built on **Movement blockchain** with smart contracts ensuring guaranteed payouts and transparent transactions.

---

## 🚀 Key Features

### 🛒 **Repository Marketplace**
- Browse and discover premium code repositories
- Full-text search and advanced filtering
- Category-based organization (Web3, AI/ML, DevTools, etc.)
- Preview code snippets before purchase
- Instant access after payment
- Seller analytics and earnings dashboard

### 🏆 **Bounty Campaigns**
- Create bounties with locked rewards (trustless)
- Auto-distribution to winners on-chain
- Submission tracking and management
- Winner selection UI with flexible reward allocation
- Campaign deadlines and status tracking
- Leaderboard for top contributors

### 💰 **Blockchain-Powered Payments**
- **Movement blockchain** integration (Aptos-based)
- **Peer-to-peer** direct payments (no intermediaries)
- **Smart contracts** for access control
- Support for Petra & Razor wallets
- x402 protocol for seamless payment flows
- On-chain transaction verification

### 🔐 **Authentication & Security**
- **Privy** authentication (email + social login)
- Embedded wallet creation
- Secure payment signing
- On-chain access verification
- Admin private key protection

### 📊 **User Profiles & Analytics**
- Showcase your projects and contributions
- Earnings tracker
- Purchase history
- Bounty submissions
- Reputation system
- Profile customization

### 🎨 **Modern UI/UX**
- GitHub-inspired dark theme
- Glass morphism design
- Fully responsive (mobile-first)
- Smooth animations with Lenis
- shadcn/ui component library
- Tailwind CSS styling

### 🏅 **Leaderboard System**
- Global rankings
- Top contributors
- Most active developers
- Earnings leaderboard
- Bounty winners showcase

### ⚙️ **Admin Dashboard**
- Project moderation
- User management
- Transaction monitoring
- Analytics and insights
- Content approval workflow

---

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="50%">

### **Frontend**
- ⚛️ React 18 + TypeScript
- ⚡ Vite (blazing-fast builds)
- 🎨 Tailwind CSS
- 🧩 shadcn/ui components
- 🔀 React Router v6
- 📡 TanStack Query
- 🔐 Privy Authentication
- 👛 Aptos Wallet Adapter
- 🎭 Lucide Icons
- 📦 React Hook Form

</td>
<td valign="top" width="50%">

### **Backend**
- 🟢 Node.js + Express
- 📘 TypeScript
- 🍃 MongoDB + Mongoose
- 🌍 MongoDB Atlas
- 🔒 CORS enabled
- 📝 TypeScript schemas

</td>
</tr>
<tr>
<td valign="top" width="50%">

### **Blockchain**
- ⛓️ Movement Network
- 🏗️ Move Language (contracts)
- 🎯 Aptos SDK
- 👛 Petra Wallet
- ⚡ Razor Wallet
- 💎 Smart Contracts

</td>
<td valign="top" width="50%">

### **DevOps & Tools**
- 📦 npm/pnpm
- 🧪 Vitest (testing)
- 🔍 ESLint
- 💅 Prettier
- 🔗 Git
- 🐳 Docker (optional)

</td>
</tr>
</table>

---

## 📂 Project Structure

```
code-vault/
├── 📁 src/                          # Frontend source code
│   ├── 📁 components/              
│   │   ├── auth/                   # Authentication components
│   │   ├── bounties/               # Bounty campaign components
│   │   │   ├── BountyCard.tsx
│   │   │   ├── LaunchCampaignModal.tsx
│   │   │   ├── ManageCampaignModals.tsx
│   │   │   └── SubmitProjectModal.tsx
│   │   ├── homepage/               # Landing page sections
│   │   ├── layout/                 # Header, Footer, Sidebar
│   │   ├── repository/             # Repo cards & details
│   │   ├── ui/                     # shadcn/ui base components
│   │   └── wallet/                 # Wallet integration
│   ├── 📁 hooks/                   # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useBountyContract.ts    # Blockchain interactions
│   │   └── usePayment.ts
│   ├── 📁 lib/                     # Utilities
│   ├── 📁 pages/                   # Route pages
│   │   ├── Index.tsx               # Homepage
│   │   ├── bounty.tsx              # Bounty marketplace
│   │   ├── Repositories.tsx        # Code marketplace
│   │   ├── RepositoryDetail.tsx
│   │   ├── Profile.tsx
│   │   ├── Admin.tsx
│   │   └── leaderboard.tsx
│   └── main.tsx                    # App entry point
│
├── 📁 server/                      # Backend API
│   └── src/
│       ├── db/                     # Database connection
│       ├── models/                 # MongoDB schemas
│       │   ├── User.ts
│       │   ├── Project.ts
│       │   ├── Transaction.ts
│       │   ├── Access.ts
│       │   └── Bounty.ts
│       └── routes/                 # API endpoints
│           ├── users.ts
│           ├── projects.ts
│           ├── bounty.ts
│           ├── transactions.ts
│           ├── access.ts
│           └── payments.ts
│
├── 📁 move_contracts/              # Smart contracts
│   └── sources/
│       └── bounty_campaign.move    # Bounty contract
│
├── 📁 public/                      # Static assets
├── 📄 package.json
├── 📄 vite.config.ts
└── 📄 README.md
```

---

## 🚦 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **MongoDB Atlas** account
- **Privy** account (free tier available)
- **Movement** wallet (Petra/Razor)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/code-vault.git
cd code-vault

# 2. Install frontend dependencies
npm install

# 3. Install backend dependencies
cd server && npm install && cd ..

# 4. Setup environment variables
cp .env.example .env
cp server/.env.example server/.env

# 5. Configure your .env files (see Environment Setup below)

# 6. Start development servers
npm run dev:all
```

🎉 **Frontend**: http://localhost:5173  
🚀 **Backend**: http://localhost:3001

---

## ⚙️ Environment Setup

### Frontend (`.env`)

```env
VITE_PRIVY_APP_ID=your_privy_app_id
VITE_API_URL=http://localhost:3001
VITE_MOVEMENT_CHAIN_ID=250
REACT_APP_BOUNTY_CONTRACT_ADDRESS=0x_your_deployed_contract
REACT_APP_MOVEMENT_RPC=https://aptos.testnet.bardock.movementlabs.xyz/v1
```

### Backend (`server/.env`)

```env
PORT=3001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/codevault
FRONTEND_URL=http://localhost:5173

# Movement Blockchain
MOVEMENT_RPC_URL=https://aptos.testnet.bardock.movementlabs.xyz/v1
MOVEMENT_CHAIN_ID=250
MOVEMENT_CONTRACT_ADDRESS=0x_your_contract_address
MOVEMENT_ADMIN_PRIVATE_KEY=0x_your_private_key

# Pricing (in smallest units, 8 decimals)
VIEW_PRICE_MOVE=50000000        # 0.5 MOVE
DOWNLOAD_PRICE_MOVE=100000000   # 1 MOVE

# x402 Protocol
X402_FACILITATOR_URL=https://facilitator.stableyard.fi
```

<details>
<summary><b>🔑 Environment Variables Guide</b></summary>

| Variable | Description | Required | Where to Get |
|----------|-------------|----------|--------------|
| `VITE_PRIVY_APP_ID` | Privy authentication app ID | ✅ | [privy.io](https://privy.io) |
| `MONGODB_URI` | MongoDB connection string | ✅ | [MongoDB Atlas](https://cloud.mongodb.com) |
| `MOVEMENT_CONTRACT_ADDRESS` | Deployed smart contract address | ✅ | Deploy contract first |
| `MOVEMENT_ADMIN_PRIVATE_KEY` | Admin wallet private key | ✅ | Your Movement wallet |
| `X402_FACILITATOR_URL` | Payment facilitator endpoint | ✅ | [Stableyard](https://stableyard.fi) |

</details>

---

## 🎮 Usage Guide

### For Buyers

1. **Browse Marketplace** → Discover premium code repositories
2. **Connect Wallet** → Use Petra or Razor wallet
3. **Purchase Access** → Pay with MOVE tokens
4. **Instant Access** → Download/view code immediately

### For Sellers

1. **Upload Repository** → Add your project details
2. **Set Pricing** → Choose view/download prices
3. **Get Paid** → Receive payments directly to your wallet
4. **Track Sales** → Monitor earnings in dashboard

### For Bounty Creators

1. **Launch Campaign** → Create bounty with locked rewards
2. **Review Submissions** → Evaluate contributor work
3. **Select Winners** → Choose winners and set rewards
4. **Auto-Distribution** → Smart contract sends payments

### For Contributors

1. **Browse Bounties** → Find interesting challenges
2. **Submit Work** → Upload your solution
3. **Get Rewarded** → Receive MOVE tokens automatically

---

## 🌐 API Reference

<details>
<summary><b>📡 Projects API</b></summary>

```typescript
GET    /api/projects              // List all projects
GET    /api/projects/:id          // Get by ID
GET    /api/projects/slug/:slug   // Get by slug
POST   /api/projects              // Create project
PUT    /api/projects/:id          // Update project
DELETE /api/projects/:id          // Delete project
```

</details>

<details>
<summary><b>🏆 Bounties API</b></summary>

```typescript
GET    /api/bounty                        // List all bounties
POST   /api/bounty                        // Create bounty
GET    /api/bounty/:id                    // Get bounty details
POST   /api/bounty/submit                 // Submit to bounty
GET    /api/bounty/submissions            // Get submissions
```

</details>

<details>
<summary><b>👤 Users API</b></summary>

```typescript
POST   /api/users/sync                    // Sync with Privy
GET    /api/users/:walletAddress          // Get user profile
```

</details>

<details>
<summary><b>💳 Payments API</b></summary>

```typescript
POST   /api/payments/initiate             // Start payment
POST   /api/payments/verify               // Verify payment
GET    /api/payments/check-access/:id     // Check access
```

</details>

---

## 🔐 Smart Contract Deployment

### Deploy Bounty Campaign Contract

```bash
cd move_contracts

# Compile
aptos move compile --named-addresses bounty_campaign=default

# Publish to Movement
aptos move publish --named-addresses bounty_campaign=0xYOUR_ADDRESS --assume-yes

# Initialize registry
aptos move run --function-id 'default::bounty_campaign::init'
```

### Contract Features

✅ **Campaign Creation** - Lock MOVE tokens on creation  
✅ **Atomic Distribution** - All-or-nothing reward payouts  
✅ **Double-Claim Prevention** - Each winner claims once  
✅ **Cancellation** - Refund unused funds  
✅ **View Functions** - Gas-free state queries  

See [Smart Contract Documentation](./move_contracts/README.md) for details.

---

## 🎨 Design Philosophy

### Dark Theme
- **Background**: Pure black (#000000)
- **Text**: White (#FFFFFF)
- **Accents**: Indigo gradient (#6366F1 → #8B5CF6)
- **Glass**: Backdrop blur with subtle transparency

### Typography
- **Headings**: Rubik (bold, modern)
- **Body**: Inter (clean, readable)
- **Code**: Fira Code (monospace)

### Components
- Sharp, minimal borders
- Glass morphism effects
- Smooth hover transitions
- Mobile-first responsive

---

## 🧪 Testing

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# UI mode
npm run test:ui

# Coverage
npm run test -- --coverage
```

---

## 🚀 Deployment

### Frontend (Vercel)

```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Backend (Railway/Render)

```bash
cd server
npm run build
# Deploy with environment variables
```

### Smart Contracts (Movement)

See [DEPLOYMENT.md](./move_contracts/DEPLOYMENT.md)

---

## 📊 Features Comparison

| Feature | Code Vault | GitHub | Traditional Marketplaces |
|---------|-----------|--------|--------------------------|
| Decentralized Payments | ✅ | ❌ | ❌ |
| Smart Contract Escrow | ✅ | ❌ | ⚠️ (Centralized) |
| Bounty Campaigns | ✅ | ⚠️ (Limited) | ❌ |
| Direct P2P Sales | ✅ | ❌ | ❌ |
| On-Chain Access Control | ✅ | ❌ | ❌ |
| Zero Platform Fees | ✅ | ✅ | ❌ |
| Crypto Payments | ✅ | ❌ | ⚠️ (Some) |
| Instant Access | ✅ | ✅ | ⚠️ (Varies) |

---

## 🗺️ Roadmap

- [x] Repository marketplace
- [x] Bounty campaigns with smart contracts
- [x] Movement blockchain integration
- [x] Privy authentication
- [x] Admin dashboard
- [x] Leaderboard system
- [ ] NFT-based access tokens
- [ ] Multi-chain support (Ethereum, Polygon)
- [ ] AI code analysis
- [ ] Subscription models
- [ ] Team collaborations
- [ ] Code review bounties

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Acknowledgments

- **Movement Labs** - Blockchain infrastructure
- **Privy** - Authentication solution
- **shadcn/ui** - Component library
- **Aptos** - Move language & SDK
- **MongoDB** - Database solution

---

## 📞 Support & Community

- 📧 **Email**: support@codevault.io
- 💬 **Discord**: [Join our community](https://discord.gg/codevault)
- 🐦 **Twitter**: [@CodeVaultHQ](https://twitter.com/codevaulthq)
- 📝 **Blog**: [blog.codevault.io](https://blog.codevault.io)
- 🐛 **Issues**: [GitHub Issues](https://github.com/your-repo/issues)

---

<div align="center">

### Built with ❤️ by developers, for developers

**[⬆ back to top](#-code-vault)**

</div>
