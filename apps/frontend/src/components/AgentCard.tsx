import { Citizen } from '@/hooks/useAgents';

interface AgentCardProps {
  agent: Citizen;
  onClick?: () => void;
  tier?: 'tier1' | 'tier2' | 'tier3';
}

export function AgentCard({ agent, onClick, tier = 'tier3' }: AgentCardProps) {
  const getTierColor = (t: string) => {
    switch (t) {
      case 'tier1':
        return 'border-yellow-500 bg-yellow-500/10';
      case 'tier2':
        return 'border-blue-500 bg-blue-500/10';
      default:
        return 'border-gray-500 bg-gray-500/5';
    }
  };

  const getStressColor = (stress: number) => {
    if (stress > 70) return 'text-red-500';
    if (stress > 40) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getHappinessColor = (happiness: number) => {
    if (happiness > 70) return 'text-green-500';
    if (happiness > 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div
      onClick={onClick}
      className={`border rounded-lg p-4 cursor-pointer hover:shadow-lg transition ${getTierColor(
        tier
      )}`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg">{agent.name}</h3>
          <p className="text-xs text-gray-400">
            {agent.age}y • {agent.last_action || 'idle'}
          </p>
        </div>
        <span className="text-xs px-2 py-1 bg-gray-700 rounded">
          {tier === 'tier1' ? '🤖 LLM' : tier === 'tier2' ? '🧠 Smart' : '⚙️ Simple'}
        </span>
      </div>

      {/* Needs Bar */}
      {agent.needs && (
        <div className="mb-3">
          <p className="text-xs text-gray-400 mb-1">Hunger</p>
          <div className="w-full bg-gray-700 rounded h-2">
            <div className="bg-red-500 h-2 rounded" style={{ width: `${agent.needs.hunger}%` }} />
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-gray-400">Stress</span>
          <p className={`font-bold ${getStressColor(agent.stress)}`}>{agent.stress.toFixed(0)}%</p>
        </div>
        <div>
          <span className="text-gray-400">Happiness</span>
          <p className={`font-bold ${getHappinessColor(agent.happiness)}`}>
            {agent.happiness.toFixed(0)}%
          </p>
        </div>
        <div>
          <span className="text-gray-400">Income</span>
          <p className="font-bold">${agent.income.toFixed(0)}</p>
        </div>
        <div>
          <span className="text-gray-400">Job</span>
          <p className="font-bold text-xs">{agent.job || 'Unemployed'}</p>
        </div>
      </div>

      {/* Personality Traits */}
      <div className="mt-3 pt-3 border-t border-gray-700">
        <p className="text-xs text-gray-400 mb-2">Personality</p>
        <div className="grid grid-cols-3 gap-1 text-xs">
          <div>
            <p className="text-gray-500">Openness</p>
            <p className="font-bold">{agent.personality.openness.toFixed(0)}</p>
          </div>
          <div>
            <p className="text-gray-500">Extraversion</p>
            <p className="font-bold">{agent.personality.extraversion.toFixed(0)}</p>
          </div>
          <div>
            <p className="text-gray-500">Risk</p>
            <p className="font-bold">{agent.personality.risk_tolerance.toFixed(0)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
