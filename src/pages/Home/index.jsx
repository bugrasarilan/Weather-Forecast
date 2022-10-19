import { useEffect, useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
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
      setStatus('Locating...');
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
    
      <button onClick={getLocation}>Get Location</button>
      <h1>Coordinates </h1>
      <p>{status}</p>

      {lat && <p>Latitude: {lat}</p>}
      {lng && <p>Longitude: {lng}</p>}
      {data.name && <p> şehir: {data.name} </p>}
      {data.main && <p> sıcaklık: {data.main.temp} </p>}



      <div>


      </div>
    </div>
  );
}
