import { useEffect, useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { BsCloudRainHeavy } from "react-icons/bs";
import { WiDayCloudy } from "react-icons/wi";
import { FaRegSnowflake } from "react-icons/fa";
import { RiWindyFill } from "react-icons/ri";
import axios from "axios";

export default function Index() {
  const [status, setStatus] = useState(null);

  const [data, setData] = useState([]);
  const [iconID, setIconID] = useState();

  const API_KEY = "f5ed8092a4beef97cc44e2e85c49d2ad";

  const getLocation = async () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Loading...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);

          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric`
            )
            .then((e) => {
              console.log("e.data", e.data.weather[0].id);
              setData(e.data);
              setIconID(e.data.weather[0].id);
            });
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  //

  // {data.weather.map(data => data.main)}
  // AIzaSyDJYr8QEwBkPcOju7cLqDjdgY6hR99rUUs google maps api
  const GetIcon = () => {
    switch (iconID) {
      case 800:
        return <BsCloudRainHeavy />;
      case 600:
        return <WiDayCloudy />;

      default:
        break;
    }
  };

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
      <button onClick={getLocation}>konum bilgilerini al</button>
      <div>
        <h1>Coordinates: </h1>
        <p>{status}</p>

        {data.name && <p> şehir: {data.name} </p>}
        {data.main && <p> sıcaklık: {Math.ceil(data.main.temp)} </p>}
        {data.weather && (
          <p> havanın durumu:{data.weather.map((data) => data.main)}</p>
        )}
        {data.weather && <p> havanın özelliği:{} </p>}
      </div>
      {iconID && <GetIcon />}
    </div>


    
  )
}
