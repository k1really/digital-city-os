import { Citizen } from '../types.js';
import { Needs } from './AgentNeeds.js';

export type AgentAction =
  | 'sleep'
  | 'eat'
  | 'work'
  | 'commute'
  | 'socialize'
  | 'relax'
  | 'exercise'
  | 'crime'
  | 'protest';

interface ActionUtility {
  action: AgentAction;
  utility: number;
  reason: string;
}

export class AgentDecisionMaker {
  static evaluateActionUtility(
    citizen: Citizen,
    action: AgentAction,
    needs: Needs,
    currentHour: number
  ): number {
    const personality = citizen.personality;
    let utility = 0;

    switch (action) {
      case 'sleep':
        utility =
          needs.tiredness * 0.8 -
          personality.extraversion * 0.2 +
          (currentHour < 6 || currentHour > 22 ? 50 : 0);
        break;

      case 'eat':
        utility =
          needs.hunger * 0.9 -
          personality.neuroticism * 0.1 +
          (currentHour >= 12 && currentHour <= 14 ? 20 : 0);
        break;

      case 'work':
        utility =
          needs.work_motivation * 0.7 -
          needs.tiredness * 0.3 -
          needs.hunger * 0.2 +
          personality.conscientiousness * 0.3 +
          (currentHour >= 9 && currentHour <= 17 ? 30 : -50);
        break;

      case 'commute':
        utility =
          ((currentHour >= 8 && currentHour <= 9) || (currentHour >= 17 && currentHour <= 18)
            ? 60
            : 0) -
          personality.neuroticism * 0.4;
        break;

      case 'socialize':
        utility =
          needs.social_need * 0.8 +
          personality.extraversion * 0.4 -
          needs.tiredness * 0.2 +
          (currentHour >= 18 && currentHour <= 21 ? 20 : 0);
        break;

      case 'relax':
        utility =
          (needs.tiredness + citizen.stress) * 0.5 +
          needs.entertainment * 0.6 +
          personality.neuroticism * 0.2;
        break;

      case 'exercise':
        utility =
          needs.entertainment * 0.4 -
          needs.tiredness * 0.5 +
          personality.conscientiousness * 0.3 +
          (currentHour >= 6 && currentHour <= 9 ? 20 : 0);
        break;

      case 'crime':
        utility =
          Math.max(0, citizen.stress - 50) * 0.5 +
          (citizen.income < 1500 ? 30 : 0) +
          personality.risk_tolerance * 0.4 -
          personality.agreeableness * 0.6;
        break;

      case 'protest':
        utility =
          citizen.stress * 0.6 +
          (citizen.happiness < 40 ? 40 : 0) +
          (100 - citizen.personality.political_alignment) * 0.2;
        break;
    }

    return Math.max(0, utility);
  }

  static decideBestAction(citizen: Citizen, needs: Needs, currentHour: number): ActionUtility {
    const actions: AgentAction[] = [
      'sleep',
      'eat',
      'work',
      'commute',
      'socialize',
      'relax',
      'exercise',
    ];

    // Rare actions
    if (citizen.stress > 80 && Math.random() < 0.1) actions.push('crime');
    if (citizen.happiness < 30 && Math.random() < 0.05) actions.push('protest');

    const evaluatedActions: ActionUtility[] = actions.map((action) => ({
      action,
      utility: this.evaluateActionUtility(citizen, action, needs, currentHour),
      reason: this.getActionReason(citizen, action, needs),
    }));

    return evaluatedActions.reduce((best, current) =>
      current.utility > best.utility ? current : best
    );
  }

  private static getActionReason(citizen: Citizen, action: AgentAction, needs: Needs): string {
    const reasons: Record<AgentAction, string> = {
      sleep: `tiredness: ${needs.tiredness.toFixed(0)}`,
      eat: `hunger: ${needs.hunger.toFixed(0)}`,
      work: `motivation: ${needs.work_motivation.toFixed(0)}`,
      commute: 'scheduled commute time',
      socialize: `social need: ${needs.social_need.toFixed(0)}`,
      relax: `stress relief needed`,
      exercise: `health priority`,
      crime: `desperation: stress=${citizen.stress.toFixed(0)}`,
      protest: `unhappiness: ${(100 - citizen.happiness).toFixed(0)}`,
    };
    return reasons[action];
  }
}
