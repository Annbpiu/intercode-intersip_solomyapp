import React, {useEffect, useState} from 'react';

function App() {
    const [helloMessage, setHelloMessage] = useState();

  useEffect(() => {
      fetch('/api/hello')
          .then(res => res.json())
          .then(data => setHelloMessage(data.message))
  }, []);

  return (
      <div className="App">
        <h1>React + NestJS</h1>
          <p>{helloMessage}</p>
      </div>
  );
}

export default App;
