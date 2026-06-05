import { FastifyInstance } from 'fastify';

export async function cityRoutes(app: FastifyInstance) {
  app.get('/api/city', async () => ({
    name: 'Digital City OS',
    status: 'initializing',
    version: '0.1.0',
  }));

  app.get('/api/city/districts', async () => ({
    districts: [],
    count: 0,
  }));

  app.get('/api/city/stats', async () => ({
    tick: 0,
    paused: true,
    timeScale: 1,
    totalPopulation: 0,
    totalWealth: 0,
  }));
}
