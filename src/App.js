import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import axios from 'axios';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function NowNext() {

  const [text, setText] = useState('');
  const [vis, setVis] = useState(false);

  const update = () => {
    const d = new Date();
    if ([0,5,10,15,20,25,30,35,40,45,50,55].includes(d.getMinutes())) {
      (async () => {
        const r = await axios.get('https://ypdjc6zbc5cnvth24lk3mm45sm0qtgps.lambda-url.eu-west-1.on.aws/britbox_us_barker_one/eu-west-1');
        const next = r.data.next;
        const now = r.data.now;
        if (next.length>0) {
          const start = Date.parse(next[0].start);
          const minutesToNext = Math.round((start-d)/1000/60);
          console.log('minutes to next start', minutesToNext);
          if (minutesToNext > 10) {
            setText(`now playing: ${now.title}`);
          } else {
            setText(`next up: ${next[0].title}`);
          }
        } else {
          setText(`now playing: ${now.title}`);
        }
      })();  
    }
    if ([0,1,2,3,4,5].includes(d.getSeconds())) {
      setVis(true);
    } else {
      setVis(true);
    }
  };

  useEffect(() => {
    let interval = null;
    interval = setInterval(update, 5000);
    return () => clearInterval(interval);
  }, [text]);
  console.log(vis, text);
  if (vis) {
    return (
      <Fade in={true} timeout={2000}>
        <Box sx={{margin: '5%', color: '#F0F8FF', backgroundColor: alpha("#000080", .9)}}>
          <Typography>{text}</Typography>
        </Box>
      </Fade>
    );    
  }
  return (
    <Box sx={{margin: '5%', color: '#F0F8FF', backgroundColor: alpha("#000080", 0)}}>
      <Typography>&nbsp;</Typography>
    </Box>
  );
}

export default function App() {
  const b=0;
  return (
    <Box sx={{
      width: '100%', height: '98vh',
      backgroundColor: alpha('#000', 0),
      display: 'grid', gridTemplateRows: '1fr 1fr 1fr'
     }}>
      <Box sx={{border: b, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>
        <Box sx={{border: b}}><video
        autoPlay={true} loop={true} width={150}>
        <source src='https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4' type='video/mp4'/>
        </video></Box>
        <Box sx={{border: b}}></Box>
        <Box sx={{border: b, display: 'block', marginLeft: 'auto'}}><img alt='bounce' src='https://upload.wikimedia.org/wikipedia/commons/1/14/Animated_PNG_example_bouncing_beach_ball.png'/></Box>
      </Box>
      <Box sx={{border: b}}></Box>
      <Box sx={{border: b, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>
        <Box sx={{border: b}}></Box>
        <Box sx={{border: b, margin: 'auto'}}><NowNext/></Box>
        <Box sx={{border: b}}></Box>
      </Box>
    </Box>
  );
}
