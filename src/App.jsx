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
import font from './fonts/IBM_Plex_Sans_Regular.json';

function Text({ children }) {
    return (
        <Float>
            <Center>
                <PresentationControls
                    enabled // the controls can be disabled by setting this to false
                    global // Spin globally or by dragging the model
                    cursor // Whether to toggle cursor style on drag
                    snap={false} // Snap-back to center (can also be a spring config)
                    speed={1} // Speed factor
                    zoom={1} // Zoom factor when half the polar-max is reached
                    rotation={[0.1, 0, 0]} // Default rotation
                    polar={[Math.PI / -8, Math.PI / 8]} // Vertical limits
                    azimuth={[-0.2, 0.2]} // Horizontal limits
                    config={{ mass: 1, tension: 300, friction: 30 }} // Spring config
                >
                    <motion.mesh
                        rotation={[0.1, 0, 0]}
                    >
                        <Text3D
                            font={font}
                            size={0.6}
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
                                {'    NFT\nValidator'}
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

                {/* bio */}
                <InView
                    as="div"
                    threshold={0.7}
                    onChange={(inView) => updateContent('bio', inView)}
                    className="snap-center bg-slate-800/70 flex rounded-3xl flex-col place-content-center w-3/4 m-16 text-center text-white flex-shrink-0"
                >
                    <h1 className="text-2xl text-white/90 font-bold">bio</h1>
                    <p className="text-lg text-gray-300/70">Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.</p>
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

                <div className="snap-center m-32 text-center text-white flex-shrink-0 w-64 bg-slate-700">
                    aroistenrasoiet
                </div>

            </div>

        </div>
    );
}

// TODO
// - adjust glitch shader for size of text
// - drag to scroll + normal scroll for desktop
