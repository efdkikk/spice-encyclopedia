import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { RedisClientType } from 'redis';
import { createClient } from 'redis';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';
import { authRouter } from './routes/auth';
import { spiceRouter } from './routes/spice';
import { articleRouter } from './routes/article';
import { collectionRouter } from './routes/collection';
import { searchRouter } from './routes/search';
import { commentRouter } from './routes/comment';
import { ratingRouter } from './routes/rating';
import { userRouter } from './routes/user';
import { errorHandler } from './middleware/errorHandler';
import { authMiddleware } from './middleware/auth';
import { logMiddleware } from './middleware/logging';
import { validateRequest } from './middleware/validation';
import { config } from './config/index';

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '.env' });
}

dotenv.config({ path: '.env.prod' });

export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

// Initialize Redis client for session storage
let redisClient: RedisClientType;

const initRedis = async () => {
  try {
    redisClient = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    });

    redisClient.on('error', (err) => console.error('Redis Client Error', err));
    await redisClient.connect();
    console.log('Redis connected successfully');
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    // Fallback to memory store for sessions if Redis fails
    redisClient = null as unknown as RedisClientType;
  }
};

// Create Express application
const app = express();

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP, please try again later.' },
});

// Apply global middleware
app.use(compression());
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Setup session middleware
let sessionStore: any;

if (redisClient) {
  sessionStore = new RedisStore({ client: redisClient });
}

app.use(session({
  store: sessionStore,
  secret: process.env.SESSION_SECRET || 'default-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  },
}));

// Apply rate limiting to all routes
app.use(limiter);

// Apply logging middleware
app.use(logMiddleware);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
  });
});

// Security headers test endpoint
app.get('/api/security-check', (req, res) => {
  res.status(200).json({
    headers: req.headers,
    security: {
      xssProtection: res.getHeader('X-XSS-Protection'),
      contentSecurityPolicy: res.getHeader('Content-Security-Policy'),
      xFrameOptions: res.getHeader('X-Frame-Options'),
      strictTransportSecurity: res.getHeader('Strict-Transport-Security'),
    },
  });
});

// API Routes - Public routes
app.use('/api/auth', authRouter);

// API Routes - Protected routes (require authentication)
app.use('/api/spices', authMiddleware, spiceRouter);
app.use('/api/articles', authMiddleware, articleRouter);
app.use('/api/collections', authMiddleware, collectionRouter);
app.use('/api/search', authMiddleware, searchRouter);
app.use('/api/comments', authMiddleware, commentRouter);
app.use('/api/ratings', authMiddleware, ratingRouter);
app.use('/api/users', authMiddleware, userRouter);

// Error handling middleware - must be placed after all routes
app.use(errorHandler);

// Function to start the server
const startServer = async () => {
  try {
    // Connect to Redis
    await initRedis();

    // Connect to database
    await prisma.$connect();
    console.log('Database connection established successfully');

    // Start the server
    const PORT = process.env.PORT || 4000;
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
      console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
    });

    // Handle graceful shutdown
    const handleShutdown = async () => {
      console.log('Shutting down server gracefully...');
      await server.close();
      await prisma.$disconnect();
      if (redisClient) {
        await redisClient.disconnect();
      }
      console.log('Server shutdown complete');
      process.exit(0);
    };

    process.on('SIGINT', handleShutdown);
    process.on('SIGTERM', handleShutdown);

  } catch (error) {
    console.error('Failed to start server:', error);
    if (prisma) {
      await prisma.$disconnect();
    }
    if (redisClient && redisClient.isOpen) {
      await redisClient.disconnect();
    }
    process.exit(1);
  }
};

// Start the server if this file is executed directly
if (require.main === module) {
  startServer();
}

export { app, startServer };