import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {usePosition} from 'use-position';

function Api() {
    
    const [weather, setweather]=useState();
    const{latiude, longitude}= usePosition();
    const getweatherData=async (lat,lon)=>{
      const API_KEY = "e7ab5317ec42a1dede35dd7dfe795c29";
      const data=await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      console.log(data);
    }
    useEffect(()=>{
      latiude && longitude && getweatherData(latiude,longitude)

    },[latiude,longitude]
 )
   

  return (
    <div>
<h2> weather</h2>
    </div>
  )
}

export default Api