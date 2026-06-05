export interface Needs {
  hunger: number; // 0-100
  tiredness: number;
  social_need: number;
  work_motivation: number;
  safety: number;
  entertainment: number;
}

export class NeedsManager {
  static createDefaultNeeds(): Needs {
    return {
      hunger: Math.random() * 50,
      tiredness: Math.random() * 40,
      social_need: Math.random() * 60,
      work_motivation: 50 + Math.random() * 40,
      safety: 80 + Math.random() * 20,
      entertainment: Math.random() * 50,
    };
  }

  static calculateNeedsPriority(needs: Needs): string {
    const entries = Object.entries(needs).sort(([, a], [, b]) => b - a);
    return entries[0][0];
  }

  static decayNeeds(needs: Needs, hours: number = 1): Needs {
    return {
      hunger: Math.min(100, needs.hunger + hours * 3),
      tiredness: Math.min(100, needs.tiredness + hours * 2),
      social_need: Math.min(100, needs.social_need + hours * 1),
      work_motivation: Math.max(0, needs.work_motivation - hours * 0.5),
      safety: needs.safety, // doesn't decay naturally
      entertainment: Math.max(0, needs.entertainment - hours * 1),
    };
  }

  static satisfyNeed(needs: Needs, needType: keyof Needs, amount: number): Needs {
    return {
      ...needs,
      [needType]: Math.max(0, (needs[needType] as number) - amount),
    };
  }
}
