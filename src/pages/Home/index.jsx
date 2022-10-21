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
    <div className='flex flex-col lg:flex-row h-20  bg-gray-300 shadow-xl m-2 justify-center'>
      <div className='hidden relative md:flex w-20 bg-purple-500'>
        <div className='flex absolute bg-red-600'> nisa</div>
        <div className='flex  bg-gray-600 top-0 left-0'> yigit</div>
      </div>
    </div>
  );
}
