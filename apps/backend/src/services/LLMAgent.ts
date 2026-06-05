import { Citizen } from '../types.js';

export interface AgentMemory {
  events: Array<{ date: Date; description: string }>;
  relationships: Map<string, number>; // agent_id -> affinity (-100 to 100)
  longTermGoals: string[];
  currentObjective: string;
}

export interface LLMAgentConfig {
  role: 'politician' | 'criminal' | 'business' | 'activist';
  influence: number; // 0-100
  ambition: number; // 0-100
}

export class LLMAgent {
  citizen: Citizen;
  config: LLMAgentConfig;
  memory: AgentMemory;
  dailyPlan: string;
  lastPlanUpdate: Date;

  constructor(citizen: Citizen, config: LLMAgentConfig) {
    this.citizen = citizen;
    this.config = config;
    this.memory = {
      events: [],
      relationships: new Map(),
      longTermGoals: this.generateGoals(config),
      currentObjective: '',
    };
    this.dailyPlan = '';
    this.lastPlanUpdate = new Date();
  }

  private generateGoals(config: LLMAgentConfig): string[] {
    const goals: Record<string, string[]> = {
      politician: ['Gain political power', 'Pass key legislation', 'Build coalition'],
      criminal: ['Expand criminal empire', 'Eliminate competition', 'Protect territory'],
      business: ['Maximize profit', 'Expand market share', 'Build brand loyalty'],
      activist: ['Fight injustice', 'Organize community', 'Change policy'],
    };

    return goals[config.role] || [];
  }

  getSystemPrompt(): string {
    return `You are ${this.citizen.name}, a ${this.config.role} in the city of Digital City OS.

Personality traits:
- Openness: ${this.citizen.personality.openness}
- Conscientiousness: ${this.citizen.personality.conscientiousness}
- Extraversion: ${this.citizen.personality.extraversion}
- Agreeableness: ${this.citizen.personality.agreeableness}
- Risk tolerance: ${this.citizen.personality.risk_tolerance}

Current status:
- Happiness: ${this.citizen.happiness}
- Stress: ${this.citizen.stress}
- Influence: ${this.config.influence}
- Ambition: ${this.config.ambition}

Long-term goals:
${this.memory.longTermGoals.map((g) => `- ${g}`).join('\n')}

Recent events:
${
  this.memory.events
    .slice(-5)
    .map((e) => `- ${e.description}`)
    .join('\n') || '- None yet'
}

You make decisions based on your personality, current emotional state, and goals. Be realistic and consider consequences.`;
  }

  getDailyPlanPrompt(): string {
    return `${this.getSystemPrompt()}

Based on your current status and goals, create a detailed daily plan for today. Include:
1. Morning routine (6-9am)
2. Mid-day activities (9am-5pm)
3. Evening activities (5pm-10pm)
4. Key decisions or actions you'll take

Format as a structured plan with times and activities. Be specific and realistic.`;
  }

  getDecisionPrompt(situation: string): string {
    return `${this.getSystemPrompt()}

Current situation: ${situation}

Given this situation and your goals/personality, what would you do?
Provide a brief decision (2-3 sentences) explaining your reasoning.`;
  }

  recordEvent(description: string): void {
    this.memory.events.push({
      date: new Date(),
      description,
    });

    // Keep only last 100 events
    if (this.memory.events.length > 100) {
      this.memory.events.shift();
    }
  }

  updateRelationship(agentId: string, change: number): void {
    const current = this.memory.relationships.get(agentId) || 0;
    const updated = Math.max(-100, Math.min(100, current + change));
    this.memory.relationships.set(agentId, updated);
  }

  needsPlanUpdate(): boolean {
    const hoursSinceUpdate =
      (new Date().getTime() - this.lastPlanUpdate.getTime()) / (1000 * 60 * 60);
    return hoursSinceUpdate >= 24; // Update daily
  }
}
