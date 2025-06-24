# 🔧 Environment Variables Setup Guide

## Om Sai Gold Loan - Environment Configuration

This guide will help you set up the environment variables for both the server and client applications.

## 📁 File Structure

```
OmSai-GoldLoan/
├── Server/
│   ├── .env                 # Server environment variables (create this)
│   ├── .env.example         # Server environment template
│   └── .gitignore           # Updated to exclude .env files
├── Client/
│   ├── .env                 # Client environment variables (create this)
│   ├── .env.example         # Client environment template
│   └── .gitignore           # Updated to exclude .env files
└── ENVIRONMENT_SETUP.md     # This file
```

## 🚀 Quick Setup

### 1. Server Environment Variables

1. Navigate to the `Server` directory
2. Copy the example file: `cp .env.example .env`
3. Edit the `.env` file with your actual values

**Required Variables:**
```bash
# Database
MONGODB_URI=your-mongodb-connection-string

# JWT Security
JWT_SECRET=your-super-secret-jwt-key

# Server Configuration
PORT=3001
NODE_ENV=development
```

### 2. Client Environment Variables

1. Navigate to the `Client` directory
2. Copy the example file: `cp .env.example .env`
3. Edit the `.env` file with your actual values

**Required Variables:**
```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3001
VITE_API_PRODUCTION_URL=https://your-server-domain.com

# Application
VITE_APP_NAME=Om Sai Gold Loan
VITE_NODE_ENV=development
```

## 🔐 Security Configuration

### Server Security

1. **JWT Secret**: Generate a strong secret key
   ```bash
   # Generate a random secret (Linux/Mac)
   openssl rand -base64 32
   
   # Or use Node.js
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

2. **MongoDB Connection**: Use environment-specific connection strings
   - Development: Local MongoDB or Atlas
   - Production: MongoDB Atlas with restricted access

3. **CORS Origins**: Configure allowed origins
   ```bash
   CORS_ORIGIN=http://localhost:5173,https://your-domain.com
   ```

### Client Security

1. **API URLs**: Use different URLs for development and production
2. **Environment Mode**: Set `VITE_NODE_ENV` appropriately
3. **Feature Flags**: Control features using environment variables

## 🌍 Environment-Specific Configuration

### Development Environment

**Server (.env):**
```bash
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/goldloan
JWT_SECRET=dev-secret-key-change-in-production
CORS_ORIGIN=http://localhost:5173
```

**Client (.env):**
```bash
VITE_NODE_ENV=development
VITE_API_BASE_URL=http://localhost:3001
VITE_ENABLE_DEVTOOLS=true
```

### Production Environment

**Server (.env):**
```bash
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/database
JWT_SECRET=super-secure-production-secret
CORS_ORIGIN=https://your-domain.com
```

**Client (.env):**
```bash
VITE_NODE_ENV=production
VITE_API_PRODUCTION_URL=https://your-server-domain.com
VITE_ENABLE_DEVTOOLS=false
```

## 📋 Environment Variables Reference

### Server Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment mode | No | development |
| `PORT` | Server port | No | 3001 |
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | JWT signing secret | Yes | - |
| `JWT_EXPIRES_IN` | JWT expiration time | No | 30m |
| `CORS_ORIGIN` | Allowed CORS origins | No | http://localhost:5173 |

### Client Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_NODE_ENV` | Environment mode | No | development |
| `VITE_API_BASE_URL` | Development API URL | Yes | - |
| `VITE_API_PRODUCTION_URL` | Production API URL | Yes | - |
| `VITE_APP_NAME` | Application name | No | Om Sai Gold Loan |

## 🚨 Important Notes

1. **Never commit .env files** to version control
2. **Use strong secrets** in production
3. **Restrict database access** in production
4. **Use HTTPS** in production
5. **Regularly rotate secrets**

## 🔄 Installation Steps

1. **Install Server Dependencies:**
   ```bash
   cd Server
   npm install
   ```

2. **Install Client Dependencies:**
   ```bash
   cd Client
   npm install
   ```

3. **Set up Environment Variables** (follow steps above)

4. **Start Development Servers:**
   ```bash
   # Terminal 1 - Server
   cd Server
   npm start
   
   # Terminal 2 - Client
   cd Client
   npm run dev
   ```

## 🆘 Troubleshooting

### Common Issues

1. **Server won't start**: Check MongoDB connection string
2. **CORS errors**: Verify CORS_ORIGIN setting
3. **JWT errors**: Ensure JWT_SECRET is set
4. **Client can't connect**: Check API URL configuration

### Environment Variable Not Loading

1. Ensure `.env` file is in the correct directory
2. Check file naming (no extra extensions)
3. Restart the development server
4. Verify variable names (VITE_ prefix for client)

## 📞 Support

If you encounter issues with environment setup, please check:
1. File permissions on .env files
2. Correct variable naming conventions
3. Network connectivity for database connections
4. Port availability (3001 for server, 5173 for client)
