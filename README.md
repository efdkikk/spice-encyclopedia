# Spice Encyclopedia | 香料百科

🌶️ A comprehensive digital encyclopedia for spices - Full-stack web application with Next.js, Node.js, and PostgreSQL

## 🚀 Project Overview

Spice Encyclopedia is a modern web platform that aims to provide detailed information about various spices from around the world. The platform features comprehensive spice profiles, culinary uses, medicinal properties, recipes, and a community-driven content ecosystem.

### 🔄 Recent Architecture Refinements

- **Monolithic Architecture**: Simplified from microservices to a cleaner monolithic structure
- **Unified Database**: All services now share a single PostgreSQL database
- **Simplified Search**: Replaced Elasticsearch with PostgreSQL full-text search
- **Streamlined Storage**: Consolidated file storage to a single solution

## ✨ Core Features

- **Spice Database**: Detailed profiles for hundreds of spices with images, origins, and properties
- **Recipe Collection**: Curated recipes featuring spice combinations
- **Educational Content**: Articles about spice history, cultivation, and usage
- **User Contributions**: Reviews, ratings, and personal collections
- **Advanced Search**: Filter by cuisine, flavor profile, origin, and more
- **Nutritional Information**: Health benefits and nutritional content
- **Medicinal Properties**: Evidence-based information on therapeutic uses
- **Personalization**: User preferences and recommendations

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express** and **TypeScript**
- **Prisma ORM** for database interactions
- **PostgreSQL** as primary database
- **Redis** for caching and session management
- **JWT Authentication** with refresh token system
- **Rate Limiting** for security

### Frontend
- **Next.js 14** with **React 18**
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Zustand** for state management
- **next-intl** for internationalization
- **Framer Motion** for animations
- **React Hook Form** for form handling

## 📋 Prerequisites

- **Node.js** 18.x or higher
- **PostgreSQL** 15.x or higher
- **Redis** 7.x or higher
- **Git** for version control

## 🚦 Getting Started

### 1. Clone the Repository

```bash
# HTTPS
https://github.com/efdkikk/spice-encyclopedia.git

# SSH
git@github.com:efdkikk/spice-encyclopedia.git

cd spice-encyclopedia
```

### 2. Set Up Environment Variables

```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your configuration

# Frontend
cp frontend/.env.example frontend/.env.local
# Edit frontend/.env.local with your configuration
```

### 3. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Database Setup

```bash
# Backend
cd backend
npx prisma migrate dev --name init
npx prisma db seed
```

### 5. Run Development Servers

```bash
# Backend (in one terminal)
cd backend
npm run dev

# Frontend (in another terminal)
cd frontend
npm run dev
```

## 🌐 Deployment

The project includes deployment scripts for various environments:

- `deploy-easy.ps1`: Simple deployment script for Windows
- `deploy-docker.ps1`: Docker-based deployment
- `deploy-kubernetes.ps1`: Kubernetes deployment (advanced)

## 🤝 Contributing

We welcome contributions to Spice Encyclopedia! Please see our contributing guidelines for more information.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🌟 Acknowledgements

- All the spice enthusiasts and culinary experts who contributed content
- The open-source community for providing valuable tools and libraries