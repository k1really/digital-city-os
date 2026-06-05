import { create } from 'zustand';

interface CityState {
  isConnected: boolean;
  isPaused: boolean;
  timeScale: number;
  selectedDistrict: string | null;
  actions: {
    setConnected: (connected: boolean) => void;
    setPaused: (paused: boolean) => void;
    setTimeScale: (scale: number) => void;
    selectDistrict: (id: string | null) => void;
  };
}

export const useCityStore = create<CityState>((set) => ({
  isConnected: false,
  isPaused: true,
  timeScale: 1,
  selectedDistrict: null,
  actions: {
    setConnected: (connected) => set({ isConnected: connected }),
    setPaused: (paused) => set({ isPaused: paused }),
    setTimeScale: (timeScale) => set({ timeScale }),
    selectDistrict: (id) => set({ selectedDistrict: id }),
  },
}));
