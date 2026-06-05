export interface District {
  id: string;
  name: string;
  x: number;
  y: number;
  type:
    | 'residential'
    | 'industrial'
    | 'commercial'
    | 'elite'
    | 'slums'
    | 'suburbs'
    | 'tech'
    | 'financial';
  population: number;
  wealth: number;
  crime: number;
  pollution: number;
  happiness: number;
  unemployment: number;
  traffic_density: number;
}

export interface Personality {
  openness: number; // 0-100
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
  risk_tolerance: number;
  political_alignment: number; // -100 (left) to 100 (right)
}

export interface CitizenState {
  location: 'home' | 'work' | 'transit' | 'public';
  current_activity: string;
  is_working: boolean;
  commute_progress: number; // 0-100
}

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
  personality: Personality;
  state: CitizenState;
  needs?: {
    hunger: number;
    tiredness: number;
    social_need: number;
    work_motivation: number;
    safety: number;
    entertainment: number;
  };
  memory: string[]; // recent events
  last_action?: string;
  created_at: Date;
  last_updated: Date;
}

export interface SimulationEvent {
  id: string;
  type: string;
  timestamp: Date;
  affected_district: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface SimulationState {
  tick: number;
  paused: boolean;
  timeScale: number;
  timestamp: Date;
  districts: District[];
  citizens: Citizen[];
  events: SimulationEvent[];
}
