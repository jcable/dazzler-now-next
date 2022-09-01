import './App.css';
import React from "react";
import axios from 'axios';
import Timer from './Timer';

export default function App() {

  const action = () => axios.get('https://ypdjc6zbc5cnvth24lk3mm45sm0qtgps.lambda-url.eu-west-1.on.aws/britbox_us_barker_one/eu-west-1');

  return (
    <div>
    <Timer millis={5000} action={action} />
      <div>a demo</div>
    </div>
  );
 }