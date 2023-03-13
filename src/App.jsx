/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React, {
    Suspense, useRef, useState,
} from 'react';
import { Canvas } from '@react-three/fiber';
import {
    Text3D, Float, PresentationControls, Center,
} from '@react-three/drei';
import { NodeToyMaterial, NodeToyTick } from '@nodetoy/react-nodetoy';
import { InView } from 'react-intersection-observer';
import { motion } from 'framer-motion-3d';
import glitchShader from './glitchData';
import './App.css';
import regFont from './fonts/IBM_Plex_Sans_Regular.json';
import monoFont from './fonts/IBM_Plex_Mono_Regular.json';

function Text({ children }) {
    return (
        <Float>
            <Center>
                <PresentationControls
                    global // Spin globally or by dragging the model
                    cursor // Whether to toggle cursor style on drag
                    snap={{ mass: 4, tension: 1000 }} // Snap-back to center (can also be a spring config)
                    speed={1} // Speed factor
                    zoom={1} // Zoom factor when half the polar-max is reached
                    rotation={[0.1, 0, 0]} // Default rotation
                    polar={[Math.PI / -8, Math.PI / 8]} // Vertical limits
                    azimuth={[-Math.PI / 8, Math.PI / 8]} // Horizontal limits
                    config={{ mass: 1, tension: 300, friction: 30 }} // Spring config
                >
                    <motion.mesh
                        rotation={[0.1, 0, 0]}
                    >
                        <Text3D
                            font={monoFont}
                            size={0.4}
                            bevelEnabled
                            bevelSize={0.01}
                            height={0.02}
                            bevelSegments={10}
                        >
                            {children}
                            <NodeToyMaterial data={glitchShader} />
                        </Text3D>
                    </motion.mesh>
                </PresentationControls>
            </Center>
        </Float>
    );
}

function ContentSwitch({ children }) {
    return children.find((child) => {
        if (!child.props.visible) {
            return false;
        }
        return true;
    });
}

export default function App() {
    const [visibleContent, setVisibleContent] = useState({});

    const scrollRef = useRef(null);

    const onWheel = (e) => {
        const container = scrollRef.current;
        const containerScrollPosition = scrollRef.current.scrollLeft;

        container.scrollTo({
            top: 0,
            left: containerScrollPosition + e.deltaY,
            behaviour: 'smooth',
        });
    };

    function updateContent(name, inView) {
        if (!inView) {
            return null;
        }
        const newContent = { ...visibleContent };
        Object.keys(visibleContent).forEach((key) => { newContent[key] = false; });
        newContent[name] = true;
        return setVisibleContent(newContent);
    }

    return (
        <div className="h-screen overflow-hidden max-h-screen max-w-screen flex flex-col bg-black ">

            <div className="basis-1/3 overflow-hidden">
                <Suspense fallback={<span>loading...</span>}>
                    <Canvas
                        camera={{
                            fov: 75, near: 0.1, far: 1000, position: [0, 0, 2],
                        }}
                    >
                        <NodeToyTick />
                        <directionalLight position={[0, 0, 5]} intensity={0.5} />

                        <ContentSwitch>
                            <Text visibleContent={visibleContent} visible={visibleContent.bio} content="bio">
                                {'Andrew\nGarfunkel'}
                            </Text>
                            <Text visibleContent={visibleContent} visible={visibleContent.nft} content="nft">
                                {'   NFT\nValidator'}
                            </Text>
                            <Text visibleContent={visibleContent} visible={visibleContent.tech} content="tech">
                                {'Tech\n I use'}
                            </Text>
                        </ContentSwitch>

                    </Canvas>
                </Suspense>
            </div>

            {/* NTS remove snap-x to enable horizontal scrolling */}
            <div ref={scrollRef} onWheel={onWheel} className="basis-2/3 sm:snap-none snap-x flex overflow-x-scroll ">

                {/* daisy bio */}
                <InView
                    as="div"
                    threshold={0.7}
                    onChange={(inView) => updateContent('bio', inView)}
                    className="card snap-center w-3/4 flex-shrink-0 m-16 bg-base-100"
                >
                    <img className="rounded-t-2xl" src="https://plus.unsplash.com/premium_photo-1668473366796-636e38929ddd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80" alt="Shoes" />
                    <div className="card-body overflow-x-scroll">
                        <h1 className="card-title">Bio</h1>
                        <p>
                            Lorem ipsum dolor sit amet,
                            qui minim labore adipisicing
                            minim sint cillum cupidatat.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet,
                            qui minim labore adipisicing
                            minim sint cillum cupidatat.
                        </p>
                    </div>
                </InView>

                {/* tech component */}
                <InView
                    as="div"
                    threshold={0.7}
                    onChange={(inView) => updateContent('tech', inView)}
                    className="snap-center grid grid-cols-2 bg-slate-800/70 rounded-3xl text-center w-3/4 m-16 text-white flex-shrink-0"
                >
                    <div className="tech-icon rounded-tl-3xl bg-blue-500/50 "> react </div>
                    <div className="tech-icon rounded-tr-3xl bg-cyan-500/50"> tailwind </div>

                    <div className="tech-icon bg-[rgb(0,122,204)]/50"> typescript </div>
                    <div className="tech-icon bg-green-500/50"> node </div>

                    <div className="tech-icon rounded-bl-3xl bg-yellow-500/50"> express </div>
                    <div className="tech-icon rounded-br-3xl bg-green-500/50"> mongo </div>
                </InView>

                {/* project component */}
                <InView
                    as="div"
                    threshold={0.7}
                    onChange={(inView) => updateContent('nft', inView)}
                    className="snap-center bg-slate-800/70 flex rounded-3xl flex-col place-content-center w-3/4 m-16 text-center text-white flex-shrink-0"
                >
                    <h1 className="text-2xl text-white/90 font-bold">NFT Validator</h1>
                    <p className="text-lg text-gray-300/70">tap to view more</p>
                </InView>

            </div>

            <div className="flex justify-center space-x-8 py-8">
                <input disabled defaultChecked={visibleContent.bio} type="radio" className="radio border-none radio-xs disabled:opacity-100" />
                <input disabled defaultChecked={visibleContent.tech} type="radio" className="radio border-none radio-xs disabled:opacity-100" />
                <input disabled defaultChecked={visibleContent.nft} type="radio" className="radio border-none radio-xs disabled:opacity-100" />
            </div>

        </div>
    );
}

// TODO
// - adjust glitch shader for size of text
// - drag to scroll + normal scroll for desktop
