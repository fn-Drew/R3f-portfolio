/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React, { useCallback, useState } from 'react';
import { InView } from 'react-intersection-observer';

import './App.css';
import Bio from './components/Bio';
import CurrentComponentDisplay from './components/CurrentComponentDisplay';
import DynamicCanvas from './components/DynamicCanvas';
import Project from './components/Project';
import Tech from './components/Tech';

export default function App() {
    const [visibleContent, setVisibleContent] = useState({});

    // set each component visibility false,
    // then set the current component to true
    const updateContent = useCallback((name, inView) => {
        if (!inView) {
            return null;
        }
        const newContent = { ...visibleContent };
        Object.keys(visibleContent).forEach((key) => { newContent[key] = false; });
        newContent[name] = true;
        return setVisibleContent(newContent);
    }, [visibleContent]);

    return (
        <div className="h-screen overflow-hidden max-h-screen max-w-screen flex flex-col bg-black ">
            <DynamicCanvas visibleContent={visibleContent} />

            <div className="basis-2/3 sm:snap-none snap-x flex overflow-x-scroll">
                <Bio updateContent={updateContent} />
                <Tech updateContent={updateContent} />
                <Project updateContent={updateContent} />
            </div>

            <CurrentComponentDisplay visibleContent={visibleContent} />

        </div>
    );
}

// TODO
// - adjust glitch shader for size of text
// - drag to scroll + normal scroll for desktop
