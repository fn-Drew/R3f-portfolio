import React from 'react';
import { InView } from 'react-intersection-observer';

export default function Bio({ updateContent }) {
    return (
        <InView
            as="div"
            threshold={0.7}
            onChange={(inView) => updateContent('bio', inView)}
            className="card snap-center w-3/4 flex-shrink-0 mx-16 bg-base-100"
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
    );
}
