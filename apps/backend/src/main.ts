import Fastify from 'fastify';
import cors from '@fastify/cors';
import { cityRoutes } from './routes/city.js';
import { citizenRoutes } from './routes/citizens.js';

const PORT = parseInt(process.env.PORT || '3001', 10);
const HOST = process.env.HOST || '0.0.0.0';
const NODE_ENV = process.env.NODE_ENV || 'development';

const app = Fastify({
  logger: NODE_ENV === 'development',
});

// Register plugins
app.register(cors, {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
});

// Health check
app.get('/health', async () => ({
  status: 'ok',
  timestamp: new Date().toISOString(),
  environment: NODE_ENV,
}));

// Register route groups
app.register(cityRoutes);
app.register(citizenRoutes);

// Start server
const start = async () => {
  try {
    await app.listen({ port: PORT, host: HOST });
    app.log.info(`Server running on http://${HOST}:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
