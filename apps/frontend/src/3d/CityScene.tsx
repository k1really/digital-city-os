import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { Suspense } from 'react';

function Scene() {
  return (
    <>
      <color attach="background" args={['#050810']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Grid args={[100, 100]} cellSize={1} cellColor={'#6f7280'} sectionSize={10} sectionColor={'#ef4444'} fadeStrength={0.5} />
      <OrbitControls makeDefault />
    </>
  );
}

interface CitySceneProps {
  className?: string;
}

export function CityScene({ className = '' }: CitySceneProps) {
  return (
    <Canvas className={className} camera={{ position: [0, 15, 15], fov: 75 }}>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
