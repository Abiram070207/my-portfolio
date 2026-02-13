import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const NeuralNetwork = ({ count = 80, connectionThreshold = 3.5, theme = 'dark' }) => {
    const { viewport } = useThree();
    const meshRef = useRef();
    const linesRef = useRef();

    // Theme Colors
    const nodeColor = theme === 'dark' ? "#22D3EE" : "#06B6D4"; // Cyan-400 vs Cyan-500
    const lineColor = theme === 'dark' ? "#22D3EE" : "#0891B2"; // Cyan-400 vs Cyan-600

    // Generate particles with initial data
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 25 + 4; // Shifted right
            const y = (Math.random() - 0.5) * 15;
            const z = (Math.random() - 0.5) * 12;

            temp.push({
                position: new THREE.Vector3(x, y, z),
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02
                ),
                scale: Math.random() * 0.5 + 0.5
            });
        }
        return temp;
    }, [count]);

    // Geometry for lines
    const lineGeo = useMemo(() => {
        const geometry = new THREE.BufferGeometry();
        const maxConnections = count * count;
        const positions = new Float32Array(maxConnections * 3);
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geometry;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const mouseVec = useRef(new THREE.Vector3());

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Convert mouse ndc to world approximate (assuming camera at z=10)
        mouseVec.current.set(
            (state.mouse.x * viewport.width) / 2,
            (state.mouse.y * viewport.height) / 2,
            0
        );

        // Update Particles
        particles.forEach((particle, i) => {
            // Move
            particle.position.add(particle.velocity);

            // Bounds Check & Bounce
            if (particle.position.x > 18 || particle.position.x < -8) particle.velocity.x *= -1;
            if (Math.abs(particle.position.y) > 9) particle.velocity.y *= -1;
            if (Math.abs(particle.position.z) > 8) particle.velocity.z *= -1;

            // Mouse Repulsion
            const dist = mouseVec.current.distanceTo(particle.position);
            if (dist < 4) {
                const dir = new THREE.Vector3().subVectors(particle.position, mouseVec.current).normalize();
                particle.position.addScaledVector(dir, 0.05);
            }

            // Update Instance
            dummy.position.copy(particle.position);
            dummy.scale.setScalar(particle.scale * (1 + Math.sin(time * 2 + i) * 0.2));
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;

        // Update Lines
        const positions = linesRef.current.geometry.attributes.position.array;
        let lineIndex = 0;

        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dist = particles[i].position.distanceTo(particles[j].position);

                if (dist < connectionThreshold) {
                    // Line Start
                    positions[lineIndex++] = particles[i].position.x;
                    positions[lineIndex++] = particles[i].position.y;
                    positions[lineIndex++] = particles[i].position.z;
                    // Line End
                    positions[lineIndex++] = particles[j].position.x;
                    positions[lineIndex++] = particles[j].position.y;
                    positions[lineIndex++] = particles[j].position.z;
                }
            }
        }

        linesRef.current.geometry.setDrawRange(0, lineIndex / 3);
        linesRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <group>
            {/* Nodes */}
            <instancedMesh ref={meshRef} args={[null, null, count]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshBasicMaterial color={nodeColor} transparent opacity={0.6} />
            </instancedMesh>

            {/* Connections */}
            <lineSegments ref={linesRef} geometry={lineGeo}>
                <lineBasicMaterial color={lineColor} transparent opacity={0.15} depthWrite={false} blending={THREE.AdditiveBlending} />
            </lineSegments>
        </group>
    );
};

export default NeuralNetwork;
