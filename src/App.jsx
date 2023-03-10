/* eslint-disable react/no-unknown-property */
import React from 'react';
import { Canvas } from '@react-three/fiber';
import {
    Text3D, Float, Center,
} from '@react-three/drei';
import { NodeToyMaterial, NodeToyTick } from '@nodetoy/react-nodetoy';
import glitchShader from './glitchData';
import './App.css';
import font from './fonts/IBM_Plex_Sans_Regular.json';

function Text() {
    const name = 'Andrew\nGarfunkel';
    return (
        <Float>
            <mesh rotation={[0.1, 0, 0]}>
                <Text3D
                    font={font}
                    size={0.5}
                    bevelEnabled
                    bevelSize={0.01}
                    height={0.02}
                    bevelSegments={10}
                    position={[0, 0, 0]}
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
        <div className="h-screen overflow-hidden max-h-screen max-w-screen flex flex-col bg-black ">

            <div className="basis-1/4 ">
                <Canvas
                    camera={{
                        fov: 75, near: 0.1, far: 1000, position: [0, 0, 2],
                    }}
                >
                    <NodeToyTick />
                    <directionalLight position={[0, 0, 5]} intensity={0.5} />

                    <Center disableY>
                        <Text />
                    </Center>
                </Canvas>
            </div>

            <div className="basis-3/4 snap-mandatory snap-x flex items-center space-x-12 w-screen overflow-x-scroll">
                <div className="snap-center text-white flex-shrink-0 h-2/3 w-full bg-slate-700">
                    aoristenaroisetn
                </div>
                <div className="snap-center text-white flex-shrink-0 h-2/3 w-full bg-slate-700">
                    aoristenaroisetn
                </div>
                <div className="snap-center text-white flex-shrink-0 h-2/3 w-full bg-slate-700">
                    aoristenaroisetn
                </div>
            </div>

        </div>
    );
}

// TODO
// - adjust glitchShader shader for size of text
