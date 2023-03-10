/* eslint-disable react/no-unknown-property */
import React from 'react';
import { Canvas } from '@react-three/fiber';
import {
    OrbitControls, Text3D, Float, Center, Html,
} from '@react-three/drei';
import { NodeToyMaterial, NodeToyTick } from '@nodetoy/react-nodetoy';
import glitchShader from './glitchData';
import './App.css';
import font from './fonts/IBM_Plex_Sans_Regular.json';

function Text() {
    const name = 'Andrew\nGarfunkel';
    return (
        <Float>
            <mesh rotation={[0.18, 0, 0]}>
                <Text3D
                    font={font}
                    size={0.175}
                    bevelEnabled
                    bevelSize={0.01}
                    height={0.05}
                    bevelSegments={10}
                    position={[-0.375, 1, 0]}
                >
                    {name}
                    <NodeToyMaterial data={glitchShader} />
                </Text3D>
            </mesh>
        </Float>
    );
}

export default function App() {
    return (
        <Canvas
            camera={{
                fov: 75, near: 0.1, far: 1000, position: [0, 0, 2],
            }}
        >
            <NodeToyTick />
            <OrbitControls enableZoom={false} />
            <directionalLight position={[0, 0, 5]} intensity={0.5} />

            <Center disableY>
                <Html>
                    <div style={{ color: 'red', fontSize: 40 }}>
                        ega goga
                    </div>
                    <div style={{ color: 'red' }}>
                        ega goga
                    </div>
                </Html>
                <Text />
            </Center>

        </Canvas>
    );
}

// TODO
// - adjust glitchShader shader for size of text
