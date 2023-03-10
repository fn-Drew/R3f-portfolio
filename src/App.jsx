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
                    size={0.35}
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

            <div className="basis-1/2">
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

            <div className="basis-1/2 snap-x flex overflow-x-scroll">

                {/* project component */}
                <div className="snap-center bg-slate-800/70 flex rounded-3xl flex-col place-content-center w-3/4 m-32 text-center text-white flex-shrink-0">
                    <h1 className="text-2xl font-bold p-2">NFT Validator</h1>
                    <p className="text-lg text-gray-300 p-2">tap to view more</p>
                </div>

                {/* tech component */}
                <div className="snap-center grid grid-cols-2 bg-slate-800/70 rounded-3xl text-center w-3/4 m-16 text-white flex-shrink-0 ">
                    <div className="tech-icon hover:bg-blue-500 rounded-tl-3xl bg-blue-500/25 "> react </div>
                    <div className="tech-icon hover:bg-cyan-500 rounded-tr-3xl bg-cyan-500/25"> tailwind </div>
                    <div className="tech-icon hover:bg-[rgb(0,122,204)] bg-[rgb(0,122,204)]/25"> typescript </div>
                    <div className="tech-icon hover:bg-green-500 bg-green-500/25"> node </div>
                    <div className="tech-icon hover:bg-yellow-500 rounded-bl-3xl bg-yellow-500/25"> express </div>
                    <div className="tech-icon hover:bg-green-500 rounded-br-3xl bg-green-500/25"> mongo </div>
                </div>

                <div className="snap-center m-32 text-center text-white flex-shrink-0 w-64 bg-slate-700">
                    aroistenrasoiet
                </div>

            </div>

        </div>
    );
}

// TODO
// - adjust glitch shader for size of text
