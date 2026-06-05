'use client';

import { useState } from 'react';
import { useAgents, Citizen } from '@/hooks/useAgents';
import { AgentCard } from '@/components/AgentCard';

export default function AgentsPage() {
  const { agents, stats, loading, error } = useAgents();
  const [selectedAgent, setSelectedAgent] = useState<Citizen | null>(null);
  const [filterTier, setFilterTier] = useState<'all' | 'tier1' | 'tier2' | 'tier3'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (error) {
    return (
      <div className="p-6 text-red-500">
        <h2 className="text-2xl font-bold mb-2">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  // Filter agents
  const filteredAgents = agents.filter((agent) => {
    const matchesTier = filterTier === 'all'; // TODO: add tier detection
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">🤖 Agents</h1>
        <p className="text-gray-400">
          {loading ? 'Loading...' : `${agents.length} agents in the city`}
        </p>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-700 rounded p-4">
            <p className="text-gray-400 text-sm">Total Population</p>
            <p className="text-2xl font-bold">{stats.total_citizens}</p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded p-4">
            <p className="text-gray-400 text-sm">Avg Happiness</p>
            <p className="text-2xl font-bold text-green-500">{stats.avg_happiness.toFixed(0)}%</p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded p-4">
            <p className="text-gray-400 text-sm">Avg Stress</p>
            <p className="text-2xl font-bold text-red-500">{stats.avg_stress.toFixed(0)}%</p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded p-4">
            <p className="text-gray-400 text-sm">Employed</p>
            <p className="text-2xl font-bold text-blue-500">
              {stats.employed}/{stats.total_citizens}
            </p>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search agents by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-500"
        />
        <select
          value={filterTier}
          onChange={(e) => setFilterTier(e.target.value as 'all' | 'tier1' | 'tier2' | 'tier3')}
          className="bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
        >
          <option value="all">All Tiers</option>
          <option value="tier1">Tier 1 (LLM)</option>
          <option value="tier2">Tier 2 (Smart)</option>
          <option value="tier3">Tier 3 (Simple)</option>
        </select>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAgents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onClick={() => setSelectedAgent(agent)}
            tier="tier3"
          />
        ))}
      </div>

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedAgent(null)}
        >
          <div
            className="bg-gray-900 border border-gray-700 rounded-lg p-8 max-w-2xl w-full max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-3xl font-bold">{selectedAgent.name}</h2>
                <p className="text-gray-400">Age: {selectedAgent.age}</p>
              </div>
              <button
                onClick={() => setSelectedAgent(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Left side */}
              <div>
                <h3 className="text-lg font-bold mb-4">Status</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="font-bold">{selectedAgent.state.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Activity</p>
                    <p className="font-bold">{selectedAgent.state.current_activity}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Job</p>
                    <p className="font-bold">{selectedAgent.job || 'Unemployed'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Income</p>
                    <p className="font-bold text-green-500">${selectedAgent.income.toFixed(0)}</p>
                  </div>
                </div>
              </div>

              {/* Right side */}
              <div>
                <h3 className="text-lg font-bold mb-4">Emotional State</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Happiness</p>
                    <div className="w-full bg-gray-700 rounded h-2">
                      <div
                        className="bg-green-500 h-2 rounded"
                        style={{ width: `${selectedAgent.happiness}%` }}
                      />
                    </div>
                    <p className="text-sm mt-1">{selectedAgent.happiness.toFixed(0)}%</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Stress</p>
                    <div className="w-full bg-gray-700 rounded h-2">
                      <div
                        className="bg-red-500 h-2 rounded"
                        style={{ width: `${selectedAgent.stress}%` }}
                      />
                    </div>
                    <p className="text-sm mt-1">{selectedAgent.stress.toFixed(0)}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personality */}
            {selectedAgent.needs && (
              <div className="mt-6 pt-6 border-t border-gray-700">
                <h3 className="text-lg font-bold mb-4">Needs</h3>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(selectedAgent.needs).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-gray-400 text-sm capitalize">{key.replace('_', ' ')}</p>
                      <p className="text-2xl font-bold">{(value as number).toFixed(0)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
