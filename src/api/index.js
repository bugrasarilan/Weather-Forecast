import React from "react";
import axios from "axios";
const API_KEY = "e7ab5317ec42a1dede35dd7dfe795c29";

export default async function GetWeather(lat, lon) {
  if (!lat || !lon) {
    return false;
  }

  try {
    const data = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    console.log(data);

    return data;
  } catch (e) {
    console.log("e", e);
    return e;
  }
}
