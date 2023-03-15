/* eslint-disable react/prop-types */
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center } from '@react-three/drei';
import { NodeToyTick } from '@nodetoy/react-nodetoy';

import TextHeader from './TextHeader';
import ContentSwitch from './ContentSwitch';

export default function DynamicCanvas({ visibleContent }) {
    return (
        <div className="basis-1/3 overflow-hidden">
            <Suspense fallback={<span>loading...</span>}>
                <Canvas
                    camera={{
                        fov: 75, near: 0.1, far: 1000, position: [0, 0, 2],
                    }}
                >
                    <NodeToyTick />
                    {/* eslint-disable-next-line react/no-unknown-property */}
                    <directionalLight position={[0, 0, 5]} intensity={0.5} />

                    <Center>
                        <ContentSwitch>
                            <TextHeader visibleContent={visibleContent} visible={visibleContent.bio} content="bio">
                                {' Andrew\nGarfunkel'}
                            </TextHeader>
                            <TextHeader visibleContent={visibleContent} visible={visibleContent.nft} content="nft">
                                {'   NFT\nValidator'}
                            </TextHeader>
                            <TextHeader visibleContent={visibleContent} visible={visibleContent.tech} content="tech">
                                {' Tech\n I use'}
                            </TextHeader>
                        </ContentSwitch>
                    </Center>

                </Canvas>
            </Suspense>
        </div>
    );
}
