import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import TechCharacter from './TechCharacter';

const Scene = () => {
    return (
        <Canvas className="w-full h-full" dpr={[1, 2]}>
            <Suspense fallback={null}>
                {/* Camera: Raised and Closer for waist-up shot */}
                <PerspectiveCamera makeDefault position={[2.5, 2, 4]} fov={40} />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 3}
                    minAzimuthAngle={-Math.PI / 4}
                    maxAzimuthAngle={Math.PI / 4}
                />

                {/* -- Lighting -- */}
                <ambientLight intensity={0.4} color="#ffffff" />
                <directionalLight position={[-5, 5, 5]} intensity={1} color="#ffffff" />
                <pointLight position={[2, 3, -2]} intensity={1.5} color="#22D3EE" distance={10} /> {/* Rim */}

                {/* Character Group - Scaled and Positioned */}
                <group position={[0.5, -1.3, 0]} rotation={[0, -0.5, 0]}>
                    <TechCharacter />
                </group>

            </Suspense>
        </Canvas>
    );
};

export default Scene;
