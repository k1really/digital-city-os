import { Citizen, Personality, CitizenState } from '../types.js';
import { NeedsManager } from './AgentNeeds.js';
import { AgentDecisionMaker } from './AgentDecisionMaker.js';

export class CitizenManager {
  private citizens: Map<string, Citizen> = new Map();
  private citizenIds: string[] = [];

  constructor(private maxCitizens: number = 10000) {}

  generatePersonality(): Personality {
    return {
      openness: Math.random() * 100,
      conscientiousness: Math.random() * 100,
      extraversion: Math.random() * 100,
      agreeableness: Math.random() * 100,
      neuroticism: Math.random() * 100,
      risk_tolerance: Math.random() * 100,
      political_alignment: Math.random() * 200 - 100,
    };
  }

  generateInitialState(_homeDistrict: string): CitizenState {
    return {
      location: 'home',
      current_activity: 'sleeping',
      is_working: false,
      commute_progress: 0,
    };
  }

  createCitizen(
    name: string,
    age: number,
    homeDistrict: string,
    workDistrict?: string,
    job?: string,
    income?: number
  ): Citizen {
    const id = `citizen_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const citizen: Citizen = {
      id,
      name,
      age,
      home_district: homeDistrict,
      work_district: workDistrict,
      job,
      income: income || 2000,
      stress: Math.random() * 50,
      happiness: 50 + Math.random() * 30,
      personality: this.generatePersonality(),
      state: this.generateInitialState(homeDistrict),
      needs: NeedsManager.createDefaultNeeds(),
      memory: [],
      last_action: 'idle',
      created_at: new Date(),
      last_updated: new Date(),
    };

    this.citizens.set(id, citizen);
    this.citizenIds.push(id);

    return citizen;
  }

  generatePopulation(districtId: string, count: number): Citizen[] {
    const citizens: Citizen[] = [];
    const firstNames = ['John', 'Jane', 'Alex', 'Maria', 'David', 'Sarah', 'James', 'Lisa'];
    const lastNames = [
      'Smith',
      'Johnson',
      'Williams',
      'Brown',
      'Jones',
      'Miller',
      'Davis',
      'Garcia',
    ];

    for (let i = 0; i < count; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${firstName} ${lastName}`;
      const age = 18 + Math.floor(Math.random() * 50);

      const citizen = this.createCitizen(name, age, districtId);
      citizens.push(citizen);
    }

    return citizens;
  }

  getCitizen(id: string): Citizen | undefined {
    return this.citizens.get(id);
  }

  getAllCitizens(): Citizen[] {
    return Array.from(this.citizens.values());
  }

  getCitizensByDistrict(districtId: string): Citizen[] {
    return Array.from(this.citizens.values()).filter((c) => c.home_district === districtId);
  }

  updateCitizen(id: string, updates: Partial<Citizen>): boolean {
    const citizen = this.citizens.get(id);
    if (!citizen) return false;

    const updated = { ...citizen, ...updates, last_updated: new Date() };
    this.citizens.set(id, updated);
    return true;
  }

  removeCitizen(id: string): boolean {
    const removed = this.citizens.delete(id);
    const idx = this.citizenIds.indexOf(id);
    if (idx > -1) this.citizenIds.splice(idx, 1);
    return removed;
  }

  getPopulationSize(): number {
    return this.citizens.size;
  }

  simulateTick(currentHour: number = 0): void {
    this.citizens.forEach((citizen) => {
      if (!citizen.needs) citizen.needs = NeedsManager.createDefaultNeeds();

      // Decay needs
      citizen.needs = NeedsManager.decayNeeds(citizen.needs, 1);

      // Decide action
      const decision = AgentDecisionMaker.decideBestAction(citizen, citizen.needs, currentHour);
      citizen.last_action = decision.action;

      // Update state based on action
      this.updateStateFromAction(citizen, decision.action);

      // Apply stress and happiness changes
      this.updateEmotionalState(citizen, decision.action);

      citizen.last_updated = new Date();
    });
  }

  private updateStateFromAction(citizen: Citizen, action: string): void {
    if (!citizen.needs) return;

    switch (action) {
      case 'sleep':
        citizen.needs.tiredness = Math.max(0, citizen.needs.tiredness - 20);
        citizen.state.location = 'home';
        break;
      case 'eat':
        citizen.needs.hunger = Math.max(0, citizen.needs.hunger - 30);
        break;
      case 'work':
        citizen.state.location = 'work';
        citizen.state.is_working = true;
        citizen.income += Math.random() * 50;
        break;
      case 'socialize':
        citizen.needs.social_need = Math.max(0, citizen.needs.social_need - 25);
        break;
      case 'relax':
        citizen.needs.entertainment = Math.max(0, citizen.needs.entertainment - 20);
        citizen.stress = Math.max(0, citizen.stress - 10);
        break;
    }
  }

  private updateEmotionalState(citizen: Citizen, action: string): void {
    let happinessChange = 0;
    let stressChange = 0;

    if (action === 'work') {
      happinessChange = citizen.personality.conscientiousness * 0.1 - 5;
      stressChange = Math.random() * 5;
    } else if (action === 'socialize') {
      happinessChange = citizen.personality.extraversion * 0.1 + 5;
      stressChange = -5;
    } else if (action === 'relax') {
      happinessChange = 10;
      stressChange = -15;
    } else if (action === 'sleep') {
      stressChange = -8;
    }

    citizen.happiness = Math.max(0, Math.min(100, citizen.happiness + happinessChange));
    citizen.stress = Math.max(0, Math.min(100, citizen.stress + stressChange));
  }

  getStats() {
    const citizens = Array.from(this.citizens.values());
    const avgAge = citizens.reduce((sum, c) => sum + c.age, 0) / citizens.length;
    const avgHappiness = citizens.reduce((sum, c) => sum + c.happiness, 0) / citizens.length;
    const avgStress = citizens.reduce((sum, c) => sum + c.stress, 0) / citizens.length;
    const avgHunger =
      citizens.reduce((sum, c) => sum + (c.needs?.hunger || 0), 0) / citizens.length;

    return {
      total_citizens: citizens.length,
      avg_age: Math.round(avgAge),
      avg_happiness: Math.round(avgHappiness),
      avg_stress: Math.round(avgStress),
      avg_hunger: Math.round(avgHunger),
      employed: citizens.filter((c) => c.job).length,
      unemployed: citizens.filter((c) => !c.job).length,
    };
  }
}
