import React, { useState, useEffect } from 'react';

const Timer = ({millis, action}) => {
  const [text, setText] = useState('');
  const [vis, setVis] = useState('box hidden');

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
        const d = new Date();
        if ([0,5,10,15,20,25,30,35,40,45,50,55].includes(d.getMinutes())) {
          (async () => {
            const r = await action();
            const next = r.data.next;
            if (next.length>0) {
              const start = Date.parse(next[0].start);
              console.log('next start', start-d);
              if ((start-d)< 1000*10*60) {
                setText(`now playing: ${r.data.now.title}`);
              } else {
                setText(`next up: ${next[0].title}`);
              }
            }
          })();  
        }
        if ([0,1,2,3,4,5].includes(d.getSeconds())) {
          setVis("box green");
        } else {
          setVis("box hidden");
        }
      }, millis);
    return () => clearInterval(interval);
  }, [text, action, millis]);

  return (
    <div className={vis}>{text}</div>
  );
};

export default Timer;