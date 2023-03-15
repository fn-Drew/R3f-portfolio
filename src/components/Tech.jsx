import React from 'react';
import { InView } from 'react-intersection-observer';

export default function Tech({ updateContent }) {
    return (
        <InView
            as="div"
            threshold={0.7}
            onChange={(inView) => updateContent('tech', inView)}
            className="snap-center grid gap-2 grid-cols-2 rounded-3xl text-center w-3/4 mx-16 text-white flex-shrink-0"
        >

            <div className="tech-icon text-white/80 rounded-tl-3xl bg-[rgb(97,219,251)]/5 border-4 border-[rgb(97,219,251)]/50">
                react
            </div>

            <div className="tech-icon text-white/80 rounded-tr-3xl bg-[rgb(152,203,59)]/5 border-4 border-[rgb(152,203,59)]/50"> node </div>

            <div className="tech-icon text-white/80 bg-[rgb(56,189,248)]/5 border-4  border-[rgb(56,189,248)]/50"> tailwind </div>
            <div className="tech-icon text-white/80 bg-[rgb(77,176,62)]/5 border-4 border-[rgb(77,176,62)]/50"> mongo </div>

            <div className="tech-icon text-white/80 rounded-bl-3xl bg-[rgb(0,122,204)]/5 border-4 border-[rgb(0,122,204)]/50"> typescript </div>
            <div className="tech-icon text-white/80 rounded-br-3xl bg-green-700/5 border-4 border-green-700/40"> express </div>
        </InView>
    );
}
