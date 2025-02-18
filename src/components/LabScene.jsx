import React, { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { createXRStore, useXR, XR } from "@react-three/xr";
import { OrbitControls, Environment, useGLTF, PerspectiveCamera } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";

const xrStore = createXRStore({
    emulate: {
        controller: {
            left: {
                position: [-0.15649, 1.43474, -0.38368],
                quaternion: [
                    0.14766305685043335, -0.02471366710960865, -0.0037767395842820406,
                    0.9887216687202454,
                ],
            },
            right: {
                position: [0.15649, 1.43474, -0.38368],
                quaternion: [
                    0.14766305685043335, 0.02471366710960865, -0.0037767395842820406,
                    0.9887216687202454,
                ],
            },
        },
    }
});


const LabScene = () => {
    const lab = useGLTF("/lab.glb");
    // const lab = useGLTF("/spacestation.glb");
    const testTube = useGLTF("/testTube.glb");
    const beaker = useGLTF("/beaker.glb");
    const [color, setColor] = useState("white");

    const mixChemicals = () => {
        setColor("purple"); // Change color to indicate a reaction
    };

    return (
        <>
            <Canvas style={{
                position: "fixed",
                width: "100vw",
                height: "100vh",
            }} >
                <XR store={xrStore}>
                    <PerspectiveCamera makeDefault position={[0, 0.25, 0.59] } fov={75} />
                    <Environment preset="warehouse" />
                    <Physics>
                        {/* Lab Background */}
                        <primitive object={lab.scene} position={[-0.2, 1.2, -0.6]} scale={0.1} />

                        {/* Test Tube 1 */}
                        <RigidBody onClick={mixChemicals} position={[-1, 1, 0]}>
                            <primitive object={testTube.scene} scale={0.5} />
                        </RigidBody>

                        {/* Test Tube 2 */}
                        <RigidBody onClick={mixChemicals} position={[1, 1, 0]}>
                            <primitive object={testTube.scene} scale={0.5} />
                        </RigidBody>

                        {/* Beaker */}
                        <RigidBody position={[0, 0.5, 0]}>
                            <primitive object={beaker.scene} scale={0.7} />
                            <mesh position={[0, 0.3, 0]}>
                                <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
                                <meshStandardMaterial color={color} />
                            </mesh>
                        </RigidBody>
                    </Physics>
                    {/* <Controllers /> */}
                    {/* <Hands /> */}
                </XR>
                <OrbitControls  minDistance={1} maxDistance={10}/>
            </Canvas>
            <div
                style={{
                    position: "fixed",
                    display: "flex",
                    width: "100vw",
                    height: "100vh",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "white",
                }}
            >
                <div>
                    <div style={{ paddingTop: "10px" }}>
                        WebXR First Steps Tutorial -&nbsp;
                        <a href="https://github.com/meta-quest/webxr-first-steps-react">
                            GitHub
                        </a>
                        &nbsp;|&nbsp;
                        <a href="https://raw.githubusercontent.com/meta-quest/webxr-first-steps-react/main/LICENSE">
                            MIT License
                        </a>
                    </div>
                    <div>
                        Copyright © Meta Platforms, Inc |
                        <a href="https://opensource.fb.com/legal/terms/">Terms</a>
                        &nbsp;|&nbsp;
                        <a href="https://opensource.fb.com/legal/privacy/">Privacy</a>
                    </div>
                </div>
                <button
                    onClick={() => xrStore.enterVR()}
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: "20px",
                    }}
                >
                    Enter VR
                </button>
            </div></>
    );
};

export default LabScene;
