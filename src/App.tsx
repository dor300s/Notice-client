import React, { useState, useEffect } from 'react';
import { NoteApp } from './pages/NoteApp';

function App() {

  // const [fps, setFps] = useState<number>(0);

  // useEffect(() => {

  //   const times: number[] = [];

  //   function refreshLoop() {
  //     window.requestAnimationFrame(() => {
  //       const now = performance.now();
  //       while (times.length && times[0] <= now - 1000) times.shift();

  //       times.push(now);
  //       setFps(times.length);
  //       refreshLoop();

  //     });
  //   }

  //   refreshLoop();
  // }, [])

  return (
    <div className="main-container">
      {/* <h3 className="fps">FPS:{fps}</h3> */}
      <NoteApp />
    </div>
  );
}

export default App;
