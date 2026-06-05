import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { Suspense } from 'react';
import { Citizen } from '@/hooks/useAgents';

interface AgentMeshProps {
  agent: Citizen;
}

function AgentMesh({ agent }: AgentMeshProps) {
  // Position based on location
  const getPosition = (): [number, number, number] => {
    const baseX = Math.sin((parseInt(agent.id.slice(-2), 16) / 256) * Math.PI * 2) * 20;
    const baseZ = Math.cos((parseInt(agent.id.slice(-4, -2), 16) / 256) * Math.PI * 2) * 20;

    switch (agent.state.location) {
      case 'home':
        return [baseX - 15, 0.5, baseZ - 15];
      case 'work':
        return [baseX + 15, 0.5, baseZ + 15];
      case 'transit':
        return [baseX, 0.5, baseZ];
      default:
        return [baseX, 0.5, baseZ];
    }
  };

  // Color based on stress level
  const getColor = () => {
    if (agent.stress > 70) return '#ef4444'; // red
    if (agent.stress > 40) return '#eab308'; // yellow
    return '#22c55e'; // green
  };

  return (
    <mesh position={getPosition()}>
      <boxGeometry args={[0.5, 1, 0.5]} />
      <meshStandardMaterial color={getColor()} />
    </mesh>
  );
}

interface SceneProps {
  agents?: Citizen[];
}

function Scene({ agents = [] }: SceneProps) {
  return (
    <>
      <color attach="background" args={['#050810']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Grid
        args={[100, 100]}
        cellSize={1}
        cellColor={'#6f7280'}
        sectionSize={10}
        sectionColor={'#ef4444'}
        fadeStrength={0.5}
      />

      {/* Render agents */}
      {agents.map((agent) => (
        <AgentMesh key={agent.id} agent={agent} />
      ))}

      <OrbitControls makeDefault />
    </>
  );
}

interface CitySceneProps {
  className?: string;
  agents?: Citizen[];
}

export function CityScene({ className = '', agents = [] }: CitySceneProps) {
  return (
    <Canvas className={className} camera={{ position: [0, 15, 15], fov: 75 }}>
      <Suspense fallback={null}>
        <Scene agents={agents} />
      </Suspense>
    </Canvas>
  );
}
