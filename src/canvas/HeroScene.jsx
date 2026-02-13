import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import NeuralNetwork from './NeuralNetwork';

const HeroScene = ({ theme }) => {
    return (
        <Canvas
            className="w-full h-full bg-transparent"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            gl={{ alpha: true, antialias: true }}
        >
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />

            {/* Minimal Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[-5, 5, 5]} intensity={1} color="#ffffff" />
            <pointLight position={[5, -5, -5]} intensity={0.5} color="#22D3EE" />

            <Suspense fallback={null}>
                <group position={[0, 0, 0]}>
                    <NeuralNetwork theme={theme} />
                </group>
            </Suspense>

            {/* Controls */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableDamping={true}
                dampingFactor={0.05}
                minPolarAngle={Math.PI / 2 - 0.5}
                maxPolarAngle={Math.PI / 2 + 0.5}
            />
        </Canvas>
    );
};

export default HeroScene;
