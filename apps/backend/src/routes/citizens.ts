import { FastifyInstance } from 'fastify';
import { CitizenManager } from '../services/CitizenManager.js';

const citizenManager = new CitizenManager();

// Initialize with some citizens
citizenManager.generatePopulation('district_1', 100);
citizenManager.generatePopulation('district_2', 80);

export async function citizenRoutes(app: FastifyInstance) {
  app.get('/api/citizens', async () => ({
    citizens: citizenManager.getAllCitizens(),
    stats: citizenManager.getStats(),
  }));

  app.get<{ Params: { id: string } }>('/api/citizens/:id', async (req) => ({
    citizen: citizenManager.getCitizen(req.params.id),
  }));

  app.get<{ Querystring: { district: string } }>('/api/citizens/by-district', async (req) => ({
    district: req.query.district,
    citizens: citizenManager.getCitizensByDistrict(req.query.district),
    count: citizenManager.getCitizensByDistrict(req.query.district).length,
  }));

  app.get('/api/citizens/stats/overview', async () => citizenManager.getStats());

  app.post<{ Body: { name: string; age: number; home_district: string } }>(
    '/api/citizens',
    async (req) => {
      const citizen = citizenManager.createCitizen(
        req.body.name,
        req.body.age,
        req.body.home_district
      );
      return { citizen };
    }
  );
}
