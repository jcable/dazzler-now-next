import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { ThemeProvider, alpha } from '@mui/material/styles';
import axios from 'axios';
import ReithSansBoldWoff2 from './fonts/BBCReithSans_W_Bd.woff2';
import ReithSansRegularWoff2 from './fonts/BBCReithSans_W_Rg.woff2';
// import logo from './intro.png'
import { Temporal } from 'temporal-polyfill'
import { CssBaseline, createTheme } from '@mui/material';
import { SequenceAnimator } from 'react-sequence-animator';

import i00 from './images/intro/Chameleon_LT_IPP_Block_Opener_00000.png';
import i01 from './images/intro/Chameleon_LT_IPP_Block_Opener_00001.png';
import i02 from './images/intro/Chameleon_LT_IPP_Block_Opener_00002.png';
import i03 from './images/intro/Chameleon_LT_IPP_Block_Opener_00003.png';
import i04 from './images/intro/Chameleon_LT_IPP_Block_Opener_00004.png';
import i05 from './images/intro/Chameleon_LT_IPP_Block_Opener_00005.png';
import i06 from './images/intro/Chameleon_LT_IPP_Block_Opener_00006.png';
import i07 from './images/intro/Chameleon_LT_IPP_Block_Opener_00007.png';
import i08 from './images/intro/Chameleon_LT_IPP_Block_Opener_00008.png';
import i09 from './images/intro/Chameleon_LT_IPP_Block_Opener_00009.png';
import i10 from './images/intro/Chameleon_LT_IPP_Block_Opener_00010.png';
import i11 from './images/intro/Chameleon_LT_IPP_Block_Opener_00011.png';
import i12 from './images/intro/Chameleon_LT_IPP_Block_Opener_00012.png';
import i13 from './images/intro/Chameleon_LT_IPP_Block_Opener_00013.png';
import i14 from './images/intro/Chameleon_LT_IPP_Block_Opener_00014.png';
import i15 from './images/intro/Chameleon_LT_IPP_Block_Opener_00015.png';
import i16 from './images/intro/Chameleon_LT_IPP_Block_Opener_00016.png';
import i17 from './images/intro/Chameleon_LT_IPP_Block_Opener_00017.png';
import i18 from './images/intro/Chameleon_LT_IPP_Block_Opener_00018.png';
import i19 from './images/intro/Chameleon_LT_IPP_Block_Opener_00019.png';
import i20 from './images/intro/Chameleon_LT_IPP_Block_Opener_00020.png';
import i21 from './images/intro/Chameleon_LT_IPP_Block_Opener_00021.png';
import i22 from './images/intro/Chameleon_LT_IPP_Block_Opener_00022.png';
import i23 from './images/intro/Chameleon_LT_IPP_Block_Opener_00023.png';
import i24 from './images/intro/Chameleon_LT_IPP_Block_Opener_00024.png';
import i25 from './images/intro/Chameleon_LT_IPP_Block_Opener_00025.png';
import i26 from './images/intro/Chameleon_LT_IPP_Block_Opener_00026.png';
import i27 from './images/intro/Chameleon_LT_IPP_Block_Opener_00027.png';
import i28 from './images/intro/Chameleon_LT_IPP_Block_Opener_00028.png';
import i29 from './images/intro/Chameleon_LT_IPP_Block_Opener_00029.png';
import i30 from './images/intro/Chameleon_LT_IPP_Block_Opener_00030.png';
import i31 from './images/intro/Chameleon_LT_IPP_Block_Opener_00031.png';
import i32 from './images/intro/Chameleon_LT_IPP_Block_Opener_00032.png';
import i33 from './images/intro/Chameleon_LT_IPP_Block_Opener_00033.png';
import i34 from './images/intro/Chameleon_LT_IPP_Block_Opener_00034.png';
import i35 from './images/intro/Chameleon_LT_IPP_Block_Opener_00035.png';
import i36 from './images/intro/Chameleon_LT_IPP_Block_Opener_00036.png';
import i37 from './images/intro/Chameleon_LT_IPP_Block_Opener_00037.png';
import i38 from './images/intro/Chameleon_LT_IPP_Block_Opener_00038.png';
import i39 from './images/intro/Chameleon_LT_IPP_Block_Opener_00039.png';
import i40 from './images/intro/Chameleon_LT_IPP_Block_Opener_00040.png';
import i41 from './images/intro/Chameleon_LT_IPP_Block_Opener_00041.png';
import i42 from './images/intro/Chameleon_LT_IPP_Block_Opener_00042.png';
import i43 from './images/intro/Chameleon_LT_IPP_Block_Opener_00043.png';
import i44 from './images/intro/Chameleon_LT_IPP_Block_Opener_00044.png';
import i45 from './images/intro/Chameleon_LT_IPP_Block_Opener_00045.png';
import i46 from './images/intro/Chameleon_LT_IPP_Block_Opener_00046.png';
import i47 from './images/intro/Chameleon_LT_IPP_Block_Opener_00047.png';
import i48 from './images/intro/Chameleon_LT_IPP_Block_Opener_00048.png';
import i49 from './images/intro/Chameleon_LT_IPP_Block_Opener_00049.png';

const introImages = [
  i00, i01, i02, i03, i04, i05, i06, i07, i08, i09,
  i10, i11, i12, i13, i14, i15, i16, i17, i18, i19,
  i20, i21, i22, i23, i24, i25, i26, i27, i28, i29,
  i30, i31, i32, i33, i34, i35, i36, i37, i38, i39,
  i40, i41, i42, i43, i44, i45, i46, i47, i48, i49,
];

const iplayerPink = '#f54997';

const urls = {
  test: 'https://jfayiszondlcqngo5vavioz6bq0ibxen.lambda-url.eu-west-1.on.aws/',
  live: 'https://ypdjc6zbc5cnvth24lk3mm45sm0qtgps.lambda-url.eu-west-1.on.aws'
};

const theme = createTheme({
  body: {
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
  }
  typography: {
    fontFamily: 'ReithSansBold, Arial',
    fontSize: 40,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'ReithSansBold';
          font-style: bold;
          font-display: swap;
          font-weight: 400;
          src: local('ReithSans'), local('ReithSans-Bold'), url(${ReithSansBoldWoff2}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'ReithSansRegular';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('ReithSans'), local('ReithSans-Regular'), url(${ReithSansRegularWoff2}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
});


function titlefor(o, rel) {
  return o.title_hierarchy?.titles?.find((t) => t.inherited_from?.link?.rel === `pips-meta:${rel}`)?.title?.$;
}

function longtitle(item) {
  const b = titlefor(item, 'brand');
  const s = titlefor(item, 'series');
  const e = item.title_hierarchy?.titles?.find((t) => !t.inherited_from)?.title?.$;
  const t = b ? `${b} / ` : '';
  if (s) {
    return `${t}${s} / ${e}`;
  }
  return `${t}${e}`;
}

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

function NowNext({ now, next, previewMinutes }) {

  let r;
  let text;
  if (next) {
    const start = Date.parse(next.start);
    const minutesToNext = Math.round((start - (new Date())) / 1000 / 60);
    console.log('minutes to next start', minutesToNext);
    if (minutesToNext <= 0) {
      r = '';
    }
    if (minutesToNext < previewMinutes) {
      r = `next up: ${longtitle(next)}`;
    }
  }
  if (r) {
    text = r;
  } else {
    if (now) {
      text = longtitle(now);
    } else {
      text = '';
    }
  }
  return (
    <Fade in={true} timeout={500}><Typography marginTop={3}>{text}</Typography></Fade>
  );
}

function Bottom({ params }) {

  const minDuration = Temporal.Duration.from(params.minDuration || 'PT2M');
  const previewMinutes = parseInt(params.next || '10', 10);
  const env = params.env || 'live';
  const sid = params.sid;
  const region = params.region || 'eu-west-1';

  const [on, setOn] = useState(false);
  const [now, setNow] = useState();
  const [next, setNext] = useState();
  const [steady, setSteady] = useState(false);

  // 5 second timer
  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      (async () => {
        const sOfm = (new Date()).getSeconds();
        if ((sOfm / 2) < 12) {
          setOn(true);
        } else {
          setOn(false);
        }
        const r = await axios.get(`${urls[env]}/${sid}/${region}`);
        setNext(chooseNext(r.data.next, minDuration));
        setNow(r.data.now);
      })();
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <Slide direction="up" 
      in={on} mountOnEnter unmountOnExit
      onEntered={() => console.log('entered')}
       addEndListener={() => setSteady(false)}>
      <Box sx={{
        width: 'auto', color: '#ffffff',
        background: 'linear-gradient(to right, rgba(15, 15, 15, .7), rgba(245, 73, 151, .7))',
        display: 'grid', gridTemplateColumns: '1fr 4fr 1fr'
      }}>
        <Box>{steady ? <Fade in={true} timeout={1000}><Typography color={iplayerPink} marginLeft={5} marginTop={3}>iPLAYER</Typography></Fade>
        : <SequenceAnimator duration={3000} onSequenceEnd={() => setSteady(true)}>
          {introImages.map((im, index) => (<img key={index} src={im} alt='BBC'/>))}
        </SequenceAnimator>
        }
            
        </Box>
        <Box>
          {steady ? (<NowNext now={now} next={next} previewMinutes={previewMinutes} />) : ''}
        </Box>
        <Box></Box>
      </Box>
    </Slide>
  );
}

function TopLeft({ show }) {
  if (show) {
    return '';//<img src={logo} alt='CBeebies' />;
  }
  return '';
}

function TopRight({ show }) {
  if (show) {
    return <img alt='bounce' src='https://upload.wikimedia.org/wikipedia/commons/1/14/Animated_PNG_example_bouncing_beach_ball.png' />;
  }
  return '';
}

export default function App(params) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        width: '1920px', height: '1080px',
        backgroundColor: alpha('#ffffff', 0),
        display: 'grid', gridTemplateRows: '1fr 6fr 1fr'
      }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
          <Box><TopLeft show={params.tl} /></Box>
          <Box></Box>
          <Box sx={{ display: 'block', marginLeft: 'auto' }}><TopRight show={params.tr} /></Box>
        </Box>
        <Box></Box>
        <Bottom params={params} />
      </Box>
    </ThemeProvider>
  );
}
