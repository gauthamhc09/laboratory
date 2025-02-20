import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { createXRStore, XR } from "@react-three/xr";
import { OrbitControls, Environment, useGLTF, PerspectiveCamera } from "@react-three/drei";
import { Physics } from "@react-three/rapier";

const xrStore = createXRStore();

const LabScene = () => {
    const lab = useGLTF("/lab.glb");
    const beaker1 = useGLTF("/beaker.glb");
    const beaker2 = useGLTF("/beaker2.glb");
    const beaker3 = useGLTF("/beaker3.glb");

    const [beaker1Position, setBeaker1Position] = useState([-0.13, 1.32, -0.4]);
    const [beaker2Position, setBeaker2Position] = useState([-0.01, 1.32, -0.4]);
    const [isTilted, setIsTilted] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [make2Cyclinderdisappear, setMake2Cyclinderdisappear] = useState(false);
    const [beaker2Rotation, setbeaker2Rotation] = useState([0, 0, 0])

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

    useEffect(() => {
        if (beaker2Position[1] == 1.5) {
            setTimeout(() => {
                setIsVisible(false)
                setIsTilted(true)
            }, 1500)
        }
    }, [beaker2Position]);

    useEffect(() => {
        if (isTilted) {
            setbeaker2Rotation([Math.PI / 5, 0, 7.5])
            setTimeout(() => {
                setMake2Cyclinderdisappear(true)
            }, 1000)
            setTimeout(() => {
                setbeaker2Rotation([0, 0, 0]);
                setBeaker2Position((prev) =>
                    prev[1] === 1.32 ? [-0.01, 1.5, -0.4] : [-0.01, 1.32, -0.4]
                );
            }, 2000)
        }

    }, [isTilted]);

    function Beaker1({ model, position, scale, onSelect, color, rotation, quaternion }) {
        const { scene } = model;
        const cylinderHeight = 2; // Keep the cylinder's height as a variable for easy modification
        const cylinderOffset = cylinderHeight / 2; // Calculate the offset
        return (
            <mesh
                position={position}
                scale={scale}
                onPointerDown={onSelect}
                onPointerOver={(e) => e.stopPropagation()}
                onPointerOut={(e) => e.stopPropagation()}
                rotation={rotation}
                quaternion={quaternion}
            >
                <primitive object={scene} >
                    {isTilted &&
                        <mesh position={[0, cylinderOffset + cylinderHeight, 0]} > {/* Adjusted position to be inside the beaker */}
                            <cylinderGeometry args={[2, 2, cylinderHeight, 32]} /> {/* Adjusted cylinder dimensions */}
                            <meshBasicMaterial color={"blue"} />
                        </mesh>}

                    <mesh position={[0, cylinderOffset, 0]} > {/* Adjusted position to be inside the beaker */}
                        <cylinderGeometry args={[2, 2, cylinderHeight, 32]} /> {/* Adjusted cylinder dimensions */}
                        <meshBasicMaterial color={color} />
                    </mesh>
                </primitive>
            </mesh>
        );
    }

    function Beaker2({ model, position, scale, onSelect, color, rotation, quaternion }) {
        const { scene } = model;
        const cylinderHeight = 2; // Keep the cylinder's height as a variable for easy modification
        const cylinderOffset = cylinderHeight / 2; // Calculate the offset
        return (
            <mesh
                position={position}
                scale={scale}
                onPointerDown={onSelect}
                onPointerOver={(e) => e.stopPropagation()}
                onPointerOut={(e) => e.stopPropagation()}
                rotation={rotation}
                quaternion={quaternion}
            >
                <primitive object={scene} />
                {
                    isVisible && <mesh position={[0, cylinderOffset, 0]} > {/* Adjusted position to be inside the beaker */}
                        <cylinderGeometry args={[2, 2, cylinderHeight, 32]} /> {/* Adjusted cylinder dimensions */}
                        <meshBasicMaterial color={color} />
                    </mesh>
                }
            </mesh>
        );
    }
    function Beaker3({ model, position, scale, onSelect, color, rotation, quaternion }) {
        const { scene } = model;
        const cylinderHeight = 2; // Keep the cylinder's height as a variable for easy modification
        const cylinderOffset = cylinderHeight / 2; // Calculate the offset
        return (
            <mesh
                position={position}
                scale={scale}
                onPointerDown={onSelect}
                onPointerOver={(e) => e.stopPropagation()}
                onPointerOut={(e) => e.stopPropagation()}
                rotation={rotation}
                quaternion={quaternion}
            >
                <primitive object={scene} >
                    <mesh position={[0, cylinderOffset, 0]} > {/* Adjusted position to be inside the beaker */}
                        <cylinderGeometry args={[2, 2, 4, 32]} /> {/* Adjusted cylinder dimensions */}
                        <meshBasicMaterial color={color} />
                    </mesh>
                </primitive>
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

                    {
                        make2Cyclinderdisappear ?
                            <Beaker3 color="yellow" model={beaker3} position={beaker1Position} scale={[0.015, 0.015, 0.015]} />
                            :
                            <Beaker1 color="red" model={beaker1} position={beaker1Position} scale={[0.015, 0.015, 0.015]} onSelect={handleSelectBeaker1} />
                    }
                    <Beaker2
                        color="blue"
                        model={beaker2}
                        position={beaker2Position}
                        rotation={beaker2Rotation}
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
