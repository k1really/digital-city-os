import { Citizen } from '../types.js';
import { LLMAgent, LLMAgentConfig } from './LLMAgent.js';
import { CitizenManager } from './CitizenManager.js';
import { llmService } from './LLMService.js';

export type AgentTier = 'tier1' | 'tier2' | 'tier3';

export interface AgentRegistry {
  tier1: Map<string, LLMAgent>; // LLM-based NPCs
  tier2: Map<string, Citizen>; // Smart agents with cached plans
  tier3: CitizenManager; // Simple utility-based agents
}

export class AgentManager {
  private registry: AgentRegistry;

  constructor() {
    this.registry = {
      tier1: new Map(),
      tier2: new Map(),
      tier3: new CitizenManager(10000),
    };
  }

  // Tier 1: Create LLM-based key NPCs
  createKeyNPC(name: string, age: number, homeDistrict: string, config: LLMAgentConfig): LLMAgent {
    const citizen = this.registry.tier3.createCitizen(name, age, homeDistrict);

    const llmAgent = new LLMAgent(citizen, config);
    this.registry.tier1.set(citizen.id, llmAgent);

    return llmAgent;
  }

  // Tier 2: Create smart agents
  createSmartAgent(
    name: string,
    age: number,
    homeDistrict: string,
    workDistrict?: string,
    job?: string
  ): Citizen {
    const citizen = this.registry.tier3.createCitizen(name, age, homeDistrict, workDistrict, job);

    this.registry.tier2.set(citizen.id, citizen);
    return citizen;
  }

  // Tier 3: Create simple agents (already done by CitizenManager)
  createSimpleAgent(name: string, age: number, homeDistrict: string): Citizen {
    return this.registry.tier3.createCitizen(name, age, homeDistrict);
  }

  // Get agent by tier
  getAgent(id: string): Citizen | LLMAgent | undefined {
    // Check tier 1
    if (this.registry.tier1.has(id)) {
      return this.registry.tier1.get(id);
    }

    // Check tier 2
    if (this.registry.tier2.has(id)) {
      return this.registry.tier2.get(id);
    }

    // Check tier 3
    return this.registry.tier3.getCitizen(id);
  }

  getTier(id: string): AgentTier | null {
    if (this.registry.tier1.has(id)) return 'tier1';
    if (this.registry.tier2.has(id)) return 'tier2';
    if (this.registry.tier3.getCitizen(id)) return 'tier3';
    return null;
  }

  getStatsByTier() {
    return {
      tier1: {
        count: this.registry.tier1.size,
        description: 'LLM-based key NPCs',
      },
      tier2: {
        count: this.registry.tier2.size,
        description: 'Smart agents with behavior trees',
      },
      tier3: {
        count: this.registry.tier3.getPopulationSize(),
        description: 'Utility-based background population',
      },
      total: this.getTotalAgentCount(),
    };
  }

  getTotalAgentCount(): number {
    return (
      this.registry.tier1.size + this.registry.tier2.size + this.registry.tier3.getPopulationSize()
    );
  }

  // Simulation tick
  async simulateTick(currentHour: number): Promise<void> {
    // Tier 3 simulation (most agents)
    this.registry.tier3.simulateTick(currentHour);

    // Tier 2 agents can use more sophisticated logic if needed
    // (for now, they're in tier 3, but marked separately)

    // Tier 1 agents - update plans if needed
    for (const agent of this.registry.tier1.values()) {
      if (agent.needsPlanUpdate()) {
        agent.dailyPlan = await llmService.generateDailyPlan(agent);
      }
    }
  }

  // Initialize with sample population
  initializePopulation(
    districtId: string,
    counts: {
      tier1?: number;
      tier2?: number;
      tier3?: number;
    }
  ): void {
    const roles: LLMAgentConfig['role'][] = ['politician', 'criminal', 'business', 'activist'];

    // Tier 1 - Key NPCs
    if (counts.tier1) {
      for (let i = 0; i < counts.tier1; i++) {
        const role = roles[i % roles.length];
        this.createKeyNPC(`NPC_${role}_${i}`, 25 + Math.random() * 40, districtId, {
          role,
          influence: 30 + Math.random() * 50,
          ambition: 40 + Math.random() * 50,
        });
      }
    }

    // Tier 2 - Smart agents
    if (counts.tier2) {
      for (let i = 0; i < counts.tier2; i++) {
        this.createSmartAgent(`Smart_${i}`, 20 + Math.random() * 45, districtId);
      }
    }

    // Tier 3 - Simple agents
    if (counts.tier3) {
      this.registry.tier3.generatePopulation(districtId, counts.tier3);
    }
  }
}

// Singleton instance
export const agentManager = new AgentManager();
