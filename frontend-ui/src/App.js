import React, { useEffect, useState, useRef } from 'react';

function App() {
    const [helloMessage, setHelloMessage] = useState();
    const fetchedRef = useRef(false);

    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;

        fetch('/api/hello')
            .then(res => res.json())
            .then(data => setHelloMessage(data.message))
            .catch(console.error);
    }, []);

    return (
        <div className="App">
            <h1>React + NestJS</h1>
            <p>{helloMessage}</p>
        </div>
    );
}

export default App;
