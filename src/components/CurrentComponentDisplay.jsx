import React from 'react';

export default function CurrentComponentDisplay({ visibleContent }) {
    return (
        <div className="flex justify-center space-x-8 py-8">
            <input disabled defaultChecked={visibleContent.bio} type="radio" className="radio border-none radio-xs disabled:opacity-100" />
            <input disabled defaultChecked={visibleContent.tech} type="radio" className="radio border-none radio-xs disabled:opacity-100" />
            <input disabled defaultChecked={visibleContent.nft} type="radio" className="radio border-none radio-xs disabled:opacity-100" />
        </div>

    );
}
