# 香料百科 v2.0 部署指南

本指南将帮助您部署香料百科网站到生产环境。

## 📋 部署前准备

### 系统要求
- Ubuntu 20.04+ 或 CentOS 8+
- 至少 2GB RAM
- 20GB 可用磁盘空间
- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- Nginx (可选)
- Docker & Docker Compose (推荐)

### 域名和 SSL
- 一个已解析的域名
- SSL 证书（可使用 Let's Encrypt 免费证书）

## 🐳 方式一：使用 Docker Compose 部署（推荐）

### 1. 克隆项目并准备环境

```bash
# 克隆项目
git clone https://github.com/your-username/spice-encyclopedia.git
cd spice-encyclopedia

# 创建环境变量文件
cp .env.example .env.production
```

### 2. 配置环境变量

编辑 `.env.production` 文件：

```env
# 生产环境配置
NODE_ENV=production

# 数据库（使用强密码）
DATABASE_URL="postgresql://spice_user:STRONG_PASSWORD_HERE@postgres:5432/spice_encyclopedia"

# Redis
REDIS_URL="redis://redis:6379"

# JWT 密钥（使用随机生成的强密钥）
JWT_SECRET="$(openssl rand -base64 32)"
JWT_REFRESH_SECRET="$(openssl rand -base64 32)"
```