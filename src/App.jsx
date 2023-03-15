/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react';
import { InView } from 'react-intersection-observer';

import './App.css';
import DynamicCanvas from './components/DynamicCanvas';

export default function App() {
    const [visibleContent, setVisibleContent] = useState({});

    // set each component visibility false,
    // then set the current component to true
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

            <DynamicCanvas visibleContent={visibleContent} />

            <div className="basis-2/3 sm:snap-none snap-x flex overflow-x-scroll">
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
                    className="snap-center grid gap-2 grid-cols-2 rounded-3xl text-center w-3/4 m-16 text-white flex-shrink-0"
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

            {/* display for currently viewed component */}
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
