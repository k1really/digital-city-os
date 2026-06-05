import { useEffect, useState } from 'react';

export interface Citizen {
  id: string;
  name: string;
  age: number;
  home_district: string;
  work_district?: string;
  job?: string;
  income: number;
  stress: number;
  happiness: number;
  personality: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
    risk_tolerance: number;
    political_alignment: number;
  };
  state: {
    location: string;
    current_activity: string;
    is_working: boolean;
    commute_progress: number;
  };
  needs?: {
    hunger: number;
    tiredness: number;
    social_need: number;
    work_motivation: number;
    safety: number;
    entertainment: number;
  };
  last_action?: string;
}

export interface AgentsResponse {
  citizens: Citizen[];
  stats: {
    total_citizens: number;
    avg_age: number;
    avg_happiness: number;
    avg_stress: number;
    avg_hunger: number;
    employed: number;
    unemployed: number;
  };
}

export function useAgents(apiUrl: string = 'http://localhost:3001') {
  const [agents, setAgents] = useState<Citizen[]>([]);
  const [stats, setStats] = useState<AgentsResponse['stats'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/api/citizens`);
        if (!response.ok) throw new Error('Failed to fetch agents');

        const data: AgentsResponse = await response.json();
        setAgents(data.citizens);
        setStats(data.stats);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();

    // Poll every 5 seconds for updates
    const interval = setInterval(fetchAgents, 5000);
    return () => clearInterval(interval);
  }, [apiUrl]);

  return { agents, stats, loading, error };
}

export function useAgentDetail(id: string, apiUrl: string = 'http://localhost:3001') {
  const [agent, setAgent] = useState<Citizen | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/api/citizens/${id}`);
        if (!response.ok) throw new Error('Failed to fetch agent');

        const data = await response.json();
        setAgent(data.citizen);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAgent();
  }, [id, apiUrl]);

  return { agent, loading, error };
}
