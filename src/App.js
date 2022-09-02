// import './App.css';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { alpha, styled } from '@mui/material/styles';
import axios from 'axios';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { blueGrey } from '@mui/material/colors';

const Upper = styled(Paper)(({ theme }) => ({
  backgroundColor: alpha('#000', 0),
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Middle = styled(Paper)(({ theme }) => ({
  backgroundColor: alpha('#000', 0),
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Lower = styled(Paper)(({ theme }) => ({
  backgroundColor: alpha('#000', 0),
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function NowNext() {

  const [text, setText] = useState('');
  const [vis, setVis] = useState(false);

  const update = () => {
    const d = new Date();
    if ([0,5,10,15,20,25,30,35,40,45,50,55].includes(d.getMinutes())) {
    // if (true) {
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
      setVis(false);
    }
  };

  useEffect(() => {
    let interval = null;
    interval = setInterval(update, 5000);
    return () => clearInterval(interval);
  }, [text]);
  console.log(vis, text);
  if (vis) {
    return (<Box sx={{background: blueGrey}}>{text}</Box>);    
  }
  return "";
}

export default function App() {
  return (
    <Box sx={{ width: '100%' }}>
      <Stack
        direction="column"
        justifyContent="space-around"
        alignItems="center"
        spacing={2}
        sx={{height: '95vh'}}
      >
        <Upper elevation={0}></Upper>
        <Middle elevation={0}></Middle>
        <Lower elevation={0}><NowNext/></Lower>
      </Stack>
    </Box>
  );
}
