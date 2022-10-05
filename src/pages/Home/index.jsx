import  { useEffect, useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { BsCloudRainHeavy } from "react-icons/bs";
import { WiDayCloudy } from "react-icons/wi";
import { FaRegSnowflake } from "react-icons/fa";
import { RiWindyFill } from "react-icons/ri";
import GetWeather from "../../api";

export default function Index() {
  
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {

        
        setStatus('Unable to retrieve your location');
        
        
      });
    }
  }



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

      <button onClick={getLocation}>Get Location</button>
      <h1>Coordinates</h1>
      <p>{status}</p>
      {lat && <p>Latitude: {lat}</p>}
      {lng && <p>Longitude: {lng}</p>}


    </div>
  );
}
