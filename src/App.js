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
import logo from './CBeebies.png'

const nn = 'https://ypdjc6zbc5cnvth24lk3mm45sm0qtgps.lambda-url.eu-west-1.on.aws';

function chooseNext(next) {
  if (next.length>0) {
    return next[0]; // can be made more sophisticated
  }
  return undefined;
}

function NowNext() {

  const [text, setText] = useState('');
  const [now, setNow] = useState();
  const [next, setNext] = useState();
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    let interval = null;
    interval = setInterval(() => {
      (async () => {
        const r = await axios.get(`${nn}/${q.get('sid')}/${q.get('region')}`);
        setNext(chooseNext(r.data.next));
        setNow(r.data.now);
      })();  
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log('setText');
    let r;
    if (next) {
      const start = Date.parse(next.start);
      const minutesToNext = Math.round((start-(new Date()))/1000/60);
      console.log('minutes to next start', minutesToNext);
      if (minutesToNext <= 10) {
        r = `next up: ${next.title}`;
      }
    }
    if (r) {
      setText(r);
    } else {
      if (now) {
        setText(`now playing: ${now.title}`);
      } else {
        setText('');
      }
    }
  }, [next, now]);

  useEffect(() => {
    console.log('setVis');
    if (text === '') {
      setVis(false);
    } else {
      setVis([0,1,2,3,4,5].includes((new Date()).getSeconds()));
    }
  }, [text]);

  if (vis) {
    return (
      <Fade in={true} timeout={2000}>
        <Box sx={{margin: '5%', color: '#F0F8FF', backgroundColor: alpha("#000080", .9)}}>
          <Typography>{text}</Typography>
        </Box>
      </Fade>
    );    
  } else {
    return (
      <Box sx={{margin: '5%', color: '#F0F8FF', backgroundColor: alpha("#000080", 0)}}>
        <Typography>&nbsp;</Typography>
      </Box>
    );
  }
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
        <Box sx={{border: b}}><img src={logo} alt='CBeebies'/></Box>
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
