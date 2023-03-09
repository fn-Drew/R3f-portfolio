import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Float } from '@react-three/drei';
import { NodeToyMaterial, NodeToyTick } from '@nodetoy/react-nodetoy';
import glitchShader from './glitchData';
import './App.css';
import font from './fonts/IBM_Plex_Sans_Regular.json';

function Text() {
    const name = 'Andrew\nGarfunkel';
    return (
        <Float>
            <Text3D
                font={font}
                size={0.25}
                bevelEnabled
                bevelSize={0.02}
                height={0.1}
                bevelSegments={20}
            >
                {name}
                <NodeToyMaterial data={glitchShader} />
            </Text3D>
        </Float>
    );
}

export default function App() {
    return (
        <Canvas camera={{
            fov: 75, near: 0.1, far: 1000, position: [0, 0, 2],
        }}
        >
            <Text />
            <directionalLight position={[0, 0, 5]} intensity={0.5} />
            <NodeToyTick />
            <OrbitControls />
        </Canvas>
    );
}

// TODO
// - adjust glitchShader shader for size of text
