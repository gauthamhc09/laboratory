import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { createXRStore, XR } from "@react-three/xr";
import { OrbitControls, Environment, useGLTF, PerspectiveCamera } from "@react-three/drei";
import { Physics } from "@react-three/rapier";

const xrStore = createXRStore();

const LabScene = () => {
    const lab = useGLTF("/lab.glb");
    const beaker1 = useGLTF("/beaker.glb");
    const beaker2 = useGLTF("/beaker2.glb");

    const [beaker1Position, setBeaker1Position] = useState([-0.13, 1.32, -0.4]);
    const [beaker2Position, setBeaker2Position] = useState([-0.01, 1.32, -0.4]);

    const handleSelectBeaker1 = () => {
        setBeaker1Position((prev) =>
            prev[1] === 1.32 ? [-0.13, 1.5, -0.4] : [-0.13, 1.32, -0.4]
        );
    };
    const handleSelectBeaker2 = () => {
        setBeaker2Position((prev) =>
            prev[1] === 1.32 ? [-0.01, 1.5, -0.4] : [-0.01, 1.32, -0.4]
        );
    };

    function Beaker({ model, position, scale, onSelect }) {
        const { scene } = model;

        return (
            <mesh
                position={position}
                scale={scale}
                onPointerDown={onSelect}
                onPointerOver={(e) => e.stopPropagation()}
                onPointerOut={(e) => e.stopPropagation()}
            >
                <primitive object={scene} />
            </mesh>
        );
    }

    return (
        <Canvas style={{ position: "fixed", width: "100vw", height: "100vh" }}>
            <XR store={xrStore}>
                <PerspectiveCamera makeDefault position={[0, 0.25, 0.59]} fov={75} />
                <Environment preset="warehouse" />
                <Physics>
                    <primitive object={lab.scene} position={[-0.2, 1.2, -0.6]} scale={0.1} />
                    <Beaker model={beaker1} position={beaker1Position} scale={[0.015, 0.015, 0.015]}  onSelect={handleSelectBeaker1}  />
                    <Beaker 
                        model={beaker2} 
                        position={beaker2Position} 
                        scale={[0.015, 0.015, 0.015]} 
                        onSelect={handleSelectBeaker2} 
                    />
                </Physics>
            </XR>
            <OrbitControls minDistance={1} maxDistance={10} />
        </Canvas>
    );
};


export default LabScene;
