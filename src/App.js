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
import logo from './CBeebies_iPlayer.png'
import { Temporal } from 'temporal-polyfill'

const urls = {
  test: 'https://jfayiszondlcqngo5vavioz6bq0ibxen.lambda-url.eu-west-1.on.aws/',
  live: 'https://ypdjc6zbc5cnvth24lk3mm45sm0qtgps.lambda-url.eu-west-1.on.aws'
};

function chooseNext(next, minDuration) {
  const ok = (next || []).filter((e) => {
    if (e?.duration && e?.title) {
      return Temporal.Duration.compare(minDuration, Temporal.Duration.from(e.duration)) < 0;
    }
    return false;
  });
  if (ok.length > 0) {
    return ok[0];
  }
  return { title: '' };
}

function NowNext({ sid, region, previewMinutes, env, minDuration } ) {

  const [text, setText] = useState('');
  const [now, setNow] = useState();
  const [next, setNext] = useState();

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      (async () => {
        const r = await axios.get(`${urls[env]}/${sid}/${region}`);
        setNext(chooseNext(r.data.next, minDuration));
        setNow(r.data.now);
      })();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let r;
    if (next) {
      const start = Date.parse(next.start);
      const minutesToNext = Math.round((start - (new Date())) / 1000 / 60);
      console.log('minutes to next start', minutesToNext);
      if (minutesToNext <= 0) {
        r = '';
      }
      if (minutesToNext < previewMinutes) {
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

  console.log('text', text);

  if ([0, 1, 2, 3, 4, 5].includes((new Date()).getSeconds())) {
    return (
      <Fade in={true} timeout={2000}>
        <Box sx={{ margin: '5%', color: '#F0F8FF', backgroundColor: alpha("#000080", .9) }}>
          <Typography variant='h3'>{text}</Typography>
        </Box>
      </Fade>
    );
  } else {
    return (
      <Box sx={{ margin: '5%', color: '#F0F8FF', backgroundColor: alpha("#000080", 0) }}>
        <Typography >&nbsp;</Typography>
      </Box>
    );
  }
}

function TopLeft({show}) {
  if (show) {
    return <img src={logo} alt='CBeebies' />;
  }
  return '';
}

function TopRight({show}) {
  if (show) {
    return <img alt='bounce' src='https://upload.wikimedia.org/wikipedia/commons/1/14/Animated_PNG_example_bouncing_beach_ball.png' />;
  }
  return '';
}

export default function App( params ) {
  
  const minDuration = Temporal.Duration.from(params.minDuration || 'PT2M');
  const previewMinutes = parseInt(params.next || '10', 10);
  const env = params.env || 'live';
  const sid = params.sid;
  const region = params.region;
  
  const b = 0;
  return (
    <Box sx={{
      width: '100%', height: '90vh',
      backgroundColor: alpha('#000', 0),
      display: 'grid', gridTemplateRows: '1fr 1fr 1fr'
    }}>
      <Box sx={{ border: b, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
        <Box sx={{ border: b }}><TopLeft show={params.tl}/></Box>
        <Box sx={{ border: b }}></Box>
        <Box sx={{ border: b, display: 'block', marginLeft: 'auto' }}><TopRight show={params.tl}/></Box>
      </Box>
      <Box sx={{ border: b }}></Box>
      <Box sx={{ border: b, display: 'grid', gridTemplateColumns: '1fr' }}>
        <Box sx={{ border: b, margin: 'auto' }}><NowNext sid={sid}, region={region, previewMinutes={previewMinutes, env={env}, minDuration={minDuration} /></Box>
      </Box>
    </Box>
  );
}
