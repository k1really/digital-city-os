'use client';

import dynamic from 'next/dynamic';
import { useCityStore } from '@/store/cityStore';
import { useEffect } from 'react';

const CityScene = dynamic(() => import('@/3d/CityScene').then((m) => ({ default: m.CityScene })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-cyberpunk-950">
      Loading scene...
    </div>
  ),
});

export default function Home() {
  const { isPaused, actions } = useCityStore();

  useEffect(() => {
    actions.setConnected(true);
  }, [actions]);

  return (
    <div className="w-screen h-screen flex flex-col bg-cyberpunk-950">
      <header className="bg-black bg-opacity-50 text-white p-4 border-b border-red-600">
        <h1 className="text-2xl font-bold">🏙️ Digital City OS</h1>
        <p className="text-sm text-gray-400">Real-time megapolis simulation</p>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1">
          <CityScene className="w-full h-full" />
        </div>

        <aside className="w-80 bg-black bg-opacity-70 border-l border-red-600 p-4 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-red-500 mb-2">Status</h2>
              <p className="text-sm text-gray-300">
                Connected: <span className="text-green-500">{isPaused ? 'Ready' : 'Running'}</span>
              </p>
              <p className="text-sm text-gray-300">
                Simulation:{' '}
                <span className="text-yellow-500">{isPaused ? 'Paused' : 'Active'}</span>
              </p>
            </div>

            <button
              onClick={() => actions.setPaused(!isPaused)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
            >
              {isPaused ? 'Start' : 'Pause'}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
