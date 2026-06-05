import { LLMAgent } from './LLMAgent.js';

// Mock implementation for now
// In production, this would call actual Claude API via Anthropic SDK

export class LLMService {
  private cache: Map<string, { response: string; timestamp: Date }> = new Map();

  async generateDailyPlan(agent: LLMAgent): Promise<string> {
    const cacheKey = `plan_${agent.citizen.id}_${new Date().toDateString()}`;

    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (cached && this.isCacheValid(cached.timestamp)) {
        return cached.response;
      }
    }

    // Generate plan using Claude
    const plan = await this.callClaude(agent.getDailyPlanPrompt());

    // Cache for 24 hours
    this.cache.set(cacheKey, {
      response: plan,
      timestamp: new Date(),
    });

    agent.lastPlanUpdate = new Date();

    return plan;
  }

  async makeDecision(agent: LLMAgent, situation: string): Promise<string> {
    // Decisions are not cached - always fresh
    return this.callClaude(agent.getDecisionPrompt(situation));
  }

  private async callClaude(prompt: string): Promise<string> {
    // TODO: Implement actual Claude API call via Anthropic SDK
    // For now, return mock response

    // In production:
    // const client = new Anthropic({
    //   apiKey: process.env.ANTHROPIC_API_KEY,
    // });
    // const message = await client.messages.create({
    //   model: 'claude-opus-4-1',
    //   max_tokens: 1024,
    //   messages: [{ role: 'user', content: prompt }],
    // });
    // return message.content[0].text;

    return this.generateMockResponse(prompt);
  }

  private generateMockResponse(prompt: string): string {
    // Mock response based on prompt type
    if (prompt.includes('daily plan')) {
      return `Morning (6-9am): Wake up, check messages, review goals
Mid-day (9am-5pm): Attend meetings, negotiate with allies, gather information
Evening (5pm-10pm): Dinner with key contacts, plan next steps
Key decision: Will contact rival to discuss cooperation`;
    } else if (prompt.includes('situation')) {
      return `This is an important opportunity. I should act carefully but decisively. I'll gather more information first before committing.`;
    }

    return 'I will think about this carefully and act according to my goals.';
  }

  private isCacheValid(timestamp: Date): boolean {
    const hoursSinceCache = (new Date().getTime() - timestamp.getTime()) / (1000 * 60 * 60);
    return hoursSinceCache < 24;
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCacheStats() {
    return {
      cached_items: this.cache.size,
      memory_usage: `~${this.cache.size * 2}kb`,
    };
  }
}

// Singleton instance
export const llmService = new LLMService();
