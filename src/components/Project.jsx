import React from 'react';
import { InView } from 'react-intersection-observer';

export default function Project({ updateContent }) {
    return (
        <InView
            as="div"
            threshold={0.7}
            onChange={(inView) => updateContent('nft', inView)}
            className="snap-center bg-slate-800/70 flex rounded-3xl flex-col place-content-center w-3/4 mx-16 text-center text-white flex-shrink-0"
        >
            <h1 className="text-2xl text-white/90 font-bold">NFT Validator</h1>
            <p className="text-lg text-gray-300/70">tap to view more</p>
        </InView>

    );
}
