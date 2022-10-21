import { useEffect, useState } from "react";
import {  MdOutlineWbSunny } from "react-icons/md";
import { BsCloudRainHeavy } from "react-icons/bs";
import { WiDayCloudy } from "react-icons/wi";
import { FaRegSnowflake } from "react-icons/fa";
import { RiWindyFill } from "react-icons/ri";
import axios from "axios";


export default function Index() {

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const API_KEY = "f5ed8092a4beef97cc44e2e85c49d2ad"


  const getLocation = async () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Loading...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        console.log("latitude", position.coords.latitude)
        console.log("longitude", position.coords.longitude)

      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }


  const [data, setdata] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`);
      setdata(response.data);
    }
    fetchdata();
  }, [lat, lng]);

  console.log(data);




const info = "ankara"
switch(info){
  case  "izmir" : console.log("1. değer",info)
  
  break; 
  case "clear" :  console.log("2. değer",info)
  break;
  case "ankara" : console.log("3. değer",info)
  break; 
  default:   console.log("değer yok",info)
    break;
}



//
  let process =3
   switch (process) {
     case 2:
       console.log(process)
       break;
     case 3:
       console.log("3.durum",process)
       break;
     default:
       break;
  }



 // {data.weather.map(data => data.main)}
// AIzaSyDJYr8QEwBkPcOju7cLqDjdgY6hR99rUUs google maps api



  return (
    <div className='flex'>
      Home Page
      <div>
        <h2>
          güneşli
          <MdOutlineWbSunny />{" "}
        </h2>
        <h2>
          yağmurlu <BsCloudRainHeavy />
        </h2>
        <h2>
          parçalı bulutlu
          <WiDayCloudy />
        </h2>
        <h2>
          karlı
          <FaRegSnowflake />
        </h2>
        <h2>
          rüzgarlı
          <RiWindyFill />
        </h2>
      </div>
      <div>


      </div>

      <button onClick={getLocation}>konum bilgilerini al</button>


      <div><h1>Coordinates: </h1>
        <p>{status}</p>
        {lat && <p>Latitude: {lat}</p>}
        {lng && <p>Longitude: {lng}</p>}
        {data.name && <p> şehir: {data.name} </p>}
        {data.main && <p> sıcaklık: {Math.ceil(data.main.temp)} </p>}
        {data.weather && <p> havanın durumu:{data.weather.map(data => data.main) }</p>}
        {data.weather && <p> havanın özelliği:{data.weather.map(data => data.description)} </p>}
      </div>

  {info}
  


      <div>


      </div>
    </div>
  );
}
