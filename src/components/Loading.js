// components/Loading.js
import React from 'react';

const Loading = () => {
    return (
        <div className="loading">
            <h2>Loading...</h2>
            {/* You can add a spinner here if you have one */}
            <style jsx>{`
                .loading {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    font-size: 24px;
                    font-weight: bold;
                }
            `}</style>
        </div>
    );
};

export default Loading;
