# layR - Premium Code Repository Marketplace

A decentralized marketplace for discovering, sharing, and monetizing high-quality code repositories. Built with modern web technologies and blockchain integration.

## 🚀 Features

- **Repository Marketplace**: Browse and discover premium code repositories
- **Wallet Integration**: Privy-powered embedded Ethereum wallets (Sepolia testnet)
- **User Profiles**: Showcase your projects with detailed stats and analytics
- **Project Management**: Upload, manage, and monetize your code repositories
- **Dark Theme**: GitHub-inspired black/white/neutral aesthetic with glass morphism
- **Real-time Data**: MongoDB-backed API with full CRUD operations
- **Responsive Design**: Mobile-first design with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing-fast development
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **React Router** for navigation
- **TanStack Query** for data fetching
- **Privy** for wallet authentication

### Backend
- **Node.js** with Express
- **TypeScript**
- **MongoDB** with Mongoose ODM
- **MongoDB Atlas** for cloud database

### Blockchain
- **Ethereum** (Sepolia testnet)
- **Privy Embedded Wallets**
- **ethers.js** for blockchain interactions

## 📦 Project Structure

```
layR/
├── src/                      # Frontend source
│   ├── components/          # React components
│   │   ├── auth/           # Authentication components
│   │   ├── homepage/       # Landing page components
│   │   ├── layout/         # Layout components (Header, Footer)
│   │   ├── repository/     # Repository card components
│   │   ├── ui/             # shadcn/ui components
│   │   └── wallet/         # Wallet components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries
│   ├── pages/              # Page components
│   └── main.tsx            # App entry point
├── server/                  # Backend source
│   └── src/
│       ├── db/             # Database connection
│       ├── models/         # Mongoose models
│       └── routes/         # API routes
└── public/                 # Static assets
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account
- Privy account (for wallet integration)

### Installation

1. **Clone the repository**
```bash
git clone <YOUR_GIT_URL>
cd layR
```

2. **Install dependencies**
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

3. **Environment Setup**

Create `.env` in the root directory:
```env
VITE_PRIVY_APP_ID=your_privy_app_id
VITE_API_URL=http://localhost:3001
```

Create `server/.env`:
```env
PORT=3001
MONGODB_URI=your_mongodb_connection_string
```

4. **Start Development Servers**

```bash
# Terminal 1: Start backend
cd server
npm run dev

# Terminal 2: Start frontend
npm run dev
```

Frontend: http://localhost:8080
Backend: http://localhost:3001

## 🗄️ Database Models

### User
- Wallet address (primary identifier)
- Privy ID
- Email (optional)
- Profile metadata

### Project
- Title, slug, descriptions
- Owner wallet address
- Pricing (view/download)
- Technologies, category
- Images, preview, demo URL
- Stats (stars, forks, downloads)
- Publication status

### Access
- Project access control
- View/download permissions
- Transaction references

### Transaction
- Purchase records
- Blockchain transaction hashes
- Status tracking

## 🎨 Design System

- **Font**: Rubik (headings), Inter (body)
- **Colors**: Black background, white text, neutral grays
- **Components**: Glass morphism with backdrop blur
- **Borders**: Sharp edges (minimal border-radius)
- **Style**: GitHub-inspired minimalist aesthetic

## 📱 Pages

- `/` - Homepage (landing page for non-authenticated users)
- `/repositories` - Explore projects
- `/repository/:slug` - Project details
- `/repositories/new` - Add new project (protected)
- `/profile/:username` - User profile with stats
- `/login` - Authentication
- `/signup` - Registration
- `/admin` - Admin panel (protected)

## 🔐 Authentication

Uses Privy for wallet-based authentication:
- Embedded Ethereum wallets
- Email + wallet creation
- Automatic wallet generation on signup
- Sepolia testnet by default

## 🌐 API Endpoints

### Projects
- `GET /api/projects` - List projects
- `GET /api/projects/:id` - Get project by ID
- `GET /api/projects/slug/:slug` - Get project by slug
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Users
- `POST /api/users/sync` - Sync user with Privy
- `GET /api/users/:walletAddress` - Get user by wallet

### Access
- `GET /api/access/check` - Check access permissions
- `POST /api/access/grant` - Grant access
- `GET /api/access/user/:walletAddress` - Get user access

### Transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id/confirm` - Confirm transaction
- `GET /api/transactions/user/:walletAddress` - Get user transactions
- `GET /api/transactions/project/:projectId` - Get project transactions

## 🧪 Development

### Code Style
- TypeScript strict mode
- ESLint for linting
- Prettier for formatting

### Key Hooks
- `useAuth()` - Authentication state
- `useWallet()` - Wallet operations
- `useProjects()` - Fetch projects
- `useProject()` - Fetch single project

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using React, TypeScript, and Ethereum
