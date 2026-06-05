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
  ideology: number;
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
