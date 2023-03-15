import React from 'react';
import { NodeToyMaterial } from '@nodetoy/react-nodetoy';
import { motion as motion3d } from 'framer-motion-3d';
import {
    Text3D, Float, PresentationControls,
} from '@react-three/drei';
import regFont from '../fonts/IBM_Plex_Sans_Regular.json';
import monoFont from '../fonts/IBM_Plex_Mono_Regular.json';
import glitchShader from '../glitchData';

// TODO: make this actually centered on loading
// instead of jank animate={{x: [0, -1]}}
// scale 0 at start gets rid of jitter on chrome
export default function TextHeader({ children }) {
    return (
        <Float>
            <PresentationControls
                global // Spin globally or by dragging the model
                cursor // Whether to toggle cursor style on drag
                snap={{ mass: 4, tension: 1000 }} // Snap-back to center
                speed={1} // Speed factor
                zoom={1} // Zoom factor when half the polar-max is reached
                rotation={[-0.1, 0, 0]} // Default rotation
                polar={[Math.PI / -8, Math.PI / 8]} // Vertical limits
                azimuth={[-Math.PI / 8, Math.PI / 8]} // Horizontal limits
                config={{ mass: 1, tension: 300, friction: 30 }} // Spring config
            >
                <motion3d.mesh
                    transition={{
                        delay: 0.3,
                        type: 'spring',
                        scale: { duration: 1 },
                        stiffness: 100,
                    }}
                    rotation={[0.1, 0, 0]}
                    initial={{ scale: 0 }}
                    animate={{ x: [0, -1], y: [3, 0], scale: 1 }}
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
                </motion3d.mesh>
            </PresentationControls>
        </Float>
    );
}
