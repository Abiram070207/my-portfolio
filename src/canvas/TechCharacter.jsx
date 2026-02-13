import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCursor } from '@react-three/drei';
import * as THREE from 'three';

const TechCharacter = (props) => {
    const group = useRef();
    const headRef = useRef();
    const laptopRef = useRef();
    const mugRef = useRef();

    // State for interactions
    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);

    // Cursor pointer change on hover
    useCursor(hovered);

    useFrame((state) => {
        if (!group.current) return;

        const t = state.clock.getElapsedTime();

        // Idle: Very subtle float/breathing
        group.current.position.y = Math.sin(t * 1) * 0.02 - 1.1; // Lowered slightly

        // Breathing (Scale)
        const breathScale = 1 + Math.sin(t * 1.5) * 0.005;
        group.current.scale.setScalar(breathScale);

        // Mouse Tracking (Head)
        if (headRef.current) {
            const targetRotationY = hovered ? (state.mouse.x * 0.4) : 0;
            const targetRotationX = hovered ? (-state.mouse.y * 0.4 + 0.4) : 0.4;

            headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotationY, 0.1);
            headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotationX, 0.1);
        }

        // Laptop Glow
        if (laptopRef.current) {
            const intensity = hovered ? 2.5 : 1.5 + Math.sin(t * 3) * 0.2;
            laptopRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(laptopRef.current.material.emissiveIntensity, intensity, 0.1);

            // Warm shift on hover
            const hoverColor = new THREE.Color("#22D3EE").lerp(new THREE.Color("#ffffff"), 0.5);
            const baseColor = new THREE.Color("#22D3EE");
            laptopRef.current.material.emissive.lerp(hovered ? hoverColor : baseColor, 0.1);
        }

        // Mug Vibration
        if (mugRef.current) {
            mugRef.current.rotation.z = hovered ? Math.sin(t * 40) * 0.05 : THREE.MathUtils.lerp(mugRef.current.rotation.z, 0, 0.1);
        }
    });

    return (
        <group
            ref={group}
            {...props}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={() => { setActive(!active); setTimeout(() => setActive(false), 200); }}
            scale={1.3} // Increased global scale
        >
            {/* Bean Bag (Reduced size, flattened) */}
            <mesh position={[0, 0.3, 0.1]} scale={[1.0, 0.6, 1.0]} rotation={[0, 0, 0]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#0f172a" roughness={0.9} />
            </mesh>

            {/* Main Character Rig */}
            <group position={[0, 0.2, 0.1]}>

                {/* Torso - Reclined Back */}
                <mesh position={[0, 0.6, -0.1]} rotation={[-0.3, 0, 0]}>
                    <cylinderGeometry args={[0.3, 0.35, 0.75, 32]} />
                    <meshStandardMaterial color="#334155" roughness={0.7} />
                </mesh>

                {/* Legs (Thighs) - To create a lap */}
                <group position={[0, 0.35, 0.3]} rotation={[-0.2, 0, 0]}>
                    <mesh position={[0.18, 0, 0.3]} rotation={[1.4, 0.1, 0]}>
                        <capsuleGeometry args={[0.13, 0.7]} />
                        <meshStandardMaterial color="#475569" />
                    </mesh>
                    <mesh position={[-0.18, 0, 0.3]} rotation={[1.4, -0.1, 0]}>
                        <capsuleGeometry args={[0.13, 0.7]} />
                        <meshStandardMaterial color="#475569" />
                    </mesh>
                </group>

                {/* Head Group - Forward titl */}
                <group ref={headRef} position={[0, 1.25, -0.2]}>
                    {/* Head */}
                    <mesh>
                        <sphereGeometry args={[0.32, 64, 64]} />
                        <meshStandardMaterial color="#94a3b8" roughness={0.5} />
                    </mesh>
                    {/* Eyes */}
                    <mesh position={[0.12, 0.05, 0.28]} rotation={[0.1, 0, 0]}>
                        <capsuleGeometry args={[0.04, 0.1, 4, 8]} />
                        <meshStandardMaterial color="#000" />
                    </mesh>
                    <mesh position={[-0.12, 0.05, 0.28]} rotation={[0.1, 0, 0]}>
                        <capsuleGeometry args={[0.04, 0.1, 4, 8]} />
                        <meshStandardMaterial color="#000" />
                    </mesh>
                    {/* Glasses */}
                    <mesh position={[0, 0.06, 0.3]}>
                        <boxGeometry args={[0.1, 0.015, 0.01]} />
                        <meshStandardMaterial color="#1e293b" />
                    </mesh>
                </group>

                {/* Arms - Reaching Forward */}
                <group position={[0, 0.85, -0.1]}>
                    <mesh position={[0.4, -0.2, 0.3]} rotation={[0.8, 0, -0.3]}>
                        <capsuleGeometry args={[0.08, 0.7]} />
                        <meshStandardMaterial color="#334155" />
                    </mesh>
                    <mesh position={[-0.4, -0.2, 0.3]} rotation={[0.8, 0, 0.3]}>
                        <capsuleGeometry args={[0.08, 0.7]} />
                        <meshStandardMaterial color="#334155" />
                    </mesh>
                </group>
            </group>

            {/* Laptop - Resting on "lap" */}
            <group position={[0, 0.55, 0.65]} rotation={[-0.2, 0, 0]}>
                {/* Base */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[0.65, 0.02, 0.45]} />
                    <meshStandardMaterial color="#1e1e1e" roughness={0.4} metalness={0.5} />
                </mesh>
                {/* Screen Hinge */}
                <group position={[0, 0.01, -0.22]} rotation={[1.75, 0, 0]}>
                    {/* Back Lid */}
                    <mesh position={[0, 0.22, 0]}>
                        <boxGeometry args={[0.65, 0.45, 0.02]} />
                        <meshStandardMaterial color="#1e1e1e" roughness={0.4} metalness={0.5} />
                    </mesh>
                    {/* Screen Display */}
                    <mesh ref={laptopRef} position={[0, 0.22, 0.011]}>
                        <planeGeometry args={[0.6, 0.4]} />
                        <meshStandardMaterial color="#000" emissive="#22D3EE" emissiveIntensity={1.5} toneMapped={false} />
                    </mesh>
                </group>
            </group>

            {/* Coffee Mug - Floor Right */}
            <group ref={mugRef} position={[0.7, 0.1, 0.4]} rotation={[0, -0.6, 0]}>
                <mesh castShadow receiveShadow>
                    <cylinderGeometry args={[0.1, 0.08, 0.2]} />
                    <meshStandardMaterial color="#f1f5f9" roughness={0.3} />
                </mesh>
                <mesh position={[0, 0.05, 0]}>
                    <circleGeometry args={[0.08]} rotation={[-Math.PI / 2, 0, 0]} />
                    <meshStandardMaterial color="#3f2c22" />
                </mesh>
                {/* Handle */}
                <mesh position={[0.1, 0, 0]} rotation={[0, 0, 1.57]}>
                    <torusGeometry args={[0.06, 0.015, 16, 32, 2.8]} />
                    <meshStandardMaterial color="#f1f5f9" />
                </mesh>
            </group>

        </group>
    );
};

export default TechCharacter;
