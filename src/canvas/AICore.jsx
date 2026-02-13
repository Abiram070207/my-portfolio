import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

const AICore = (props) => {
    const meshRef = useRef();

    const [hovered, setHover] = useState(false);
    const [clicked, setClick] = useState(false);

    // References for individual parts
    const outerSphereRef = useRef();
    const innerCoreRef = useRef();
    const ring1Ref = useRef();
    const ring2Ref = useRef();
    const ring3Ref = useRef();
    const particlesRef = useRef();

    // Optimized Particle generation
    const particleCount = 150;
    const particlePositions = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            const r = 3 + Math.random() * 2; // Radius between 3 and 5
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }
        return positions;
    }, []);

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();

        // Subtle floating/rotation of the whole group
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.1;
        }

        // Rings Rotation
        if (ring1Ref.current) {
            ring1Ref.current.rotation.x = t * 0.2;
            ring1Ref.current.rotation.y = t * 0.1;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.x = t * 0.15 + 1; // Offset
            ring2Ref.current.rotation.z = t * 0.2;
        }
        if (ring3Ref.current) {
            ring3Ref.current.rotation.x = -t * 0.1;
            ring3Ref.current.rotation.y = t * 0.3 + 2;
        }

        // Particle Animation
        if (particlesRef.current) {
            particlesRef.current.rotation.y = -t * 0.05;
        }

        // Interaction LERPing
        const targetScale = hovered ? 1.1 : 1.0;
        const targetEmissive = hovered ? 3 : 1.5;

        // Inner Core Pulsing
        if (innerCoreRef.current) {
            // Base Pulse
            const pulse = Math.sin(t * 2) * 0.2 + 1;
            innerCoreRef.current.scale.lerp(new THREE.Vector3(pulse * targetScale, pulse * targetScale, pulse * targetScale), 0.1);

            // Color intensity change
            const currentEmissive = innerCoreRef.current.material.emissiveIntensity;
            innerCoreRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(currentEmissive, targetEmissive + (clicked ? 10 : 0), 0.1);
        }

        // Outer Sphere Opacity change on interaction
        if (outerSphereRef.current) {
            outerSphereRef.current.material.opacity = THREE.MathUtils.lerp(
                outerSphereRef.current.material.opacity,
                clicked ? 0.6 : (hovered ? 0.3 : 0.15),
                0.1
            );
        }

        // Reset Click effect
        if (clicked) {
            setTimeout(() => setClick(false), 200);
        }
    });


    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group
                ref={meshRef}
                {...props}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                onClick={() => setClick(true)}
                scale={1.5}
            >
                {/* Outer Translucent Sphere */}
                <mesh ref={outerSphereRef}>
                    <sphereGeometry args={[2.2, 64, 64]} />
                    <meshPhysicalMaterial
                        color="#22D3EE" // Cyan
                        transparent
                        opacity={0.15}
                        roughness={0}
                        metalness={0.2}
                        transmission={0.2}
                        thickness={1}
                    />
                </mesh>

                {/* Wireframe Overlay for tech look */}
                <mesh scale={[2.25, 2.25, 2.25]}>
                    <sphereGeometry args={[2.25, 16, 16]} />
                    <meshBasicMaterial color="#22D3EE" wireframe transparent opacity={0.05} />
                </mesh>

                {/* Inner Glowing Core */}
                <mesh ref={innerCoreRef}>
                    <sphereGeometry args={[0.8, 32, 32]} />
                    <meshStandardMaterial
                        color="#8B5CF6" // Violet
                        emissive="#8B5CF6"
                        emissiveIntensity={2}
                        toneMapped={false}
                    />
                </mesh>

                {/* Orbiting Rings */}
                <mesh ref={ring1Ref}>
                    <torusGeometry args={[3, 0.02, 16, 100]} />
                    <meshBasicMaterial color="#22D3EE" transparent opacity={0.6} />
                </mesh>
                <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[3.5, 0.02, 16, 100]} />
                    <meshBasicMaterial color="#8B5CF6" transparent opacity={0.4} />
                </mesh>
                <mesh ref={ring3Ref} rotation={[0, Math.PI / 4, 0]}>
                    <torusGeometry args={[2.8, 0.03, 16, 100]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
                </mesh>

                {/* Particles */}
                <points ref={particlesRef}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={particlePositions.length / 3}
                            array={particlePositions}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <pointsMaterial
                        size={0.05}
                        color="#22D3EE"
                        transparent
                        opacity={0.6}
                        sizeAttenuation={true}
                        depthWrite={false}
                    />
                </points>
            </group>
        </Float>
    );
};

export default AICore;
