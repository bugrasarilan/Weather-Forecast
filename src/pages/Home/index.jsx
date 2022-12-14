import { useState } from "react";
import axios from "axios";

export default function Index() {
  const [status, setStatus] = useState(null);
  const [data, setData] = useState([]);
  const [day, setDay] = useState([]);
  const [Search, setSearch] = useState("");
  const [iconID, setIconID] = useState();
  const [iconID1, setIconID2] = useState();
  const KEY = process.env.REACT_APP_API_KEY;

  const getLocation = async () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Loading...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          console.log("position", position)
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          console.log("latitude,longitude", lat, lng)

          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&lang=tr&appid=${KEY}&units=metric`)
            .then((e) => {
              console.log("lat,lng alarak ", data)
              console.log("e.data", e.data.weather[0].id);
              setData(e.data);
              setIconID2(e.data.weather[0].main)
            });
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  const cal = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${Search}&lang=tr&appid=${KEY}&units=metric`)
      .then((day) => {
        console.log("şehir bilgisi ", day)
        setDay(day.data)
        console.log("setday", day)
        setSearch("")
        setIconID(day.data.weather[0].main);
        console.log("main", day.data.weather[0].main);

      });
  };
  const GetIcon1 = () => {
    switch (iconID1) {
      case "Clear":
        return <img src={require(`../../images/01d.png`)} alt="sunny"></img>

      case "Clouds":
        return <img src={require(`../../images/03d.png`)} alt="Clouds"></img>

      case "Rain":
        return <img src={require(`../../images/09d.png`)} alt="Rain"></img>

      case "Thunderstorm":
        return <img src={require(`../../images/11d.png`)} alt="Thunderstorm"></img>

      case "Drizzle":
        return <img src={require(`../../images/09d.png`)} alt="Drizzle"></img>

      case "Snow":
        return <img src={require(`../../images/13d.png`)} alt="Snow"></img>

      case "Mist":
      case "Fog":
      case "Smoke":
      case "Haze":
      case "Dust":
      case "Sand":
      case "Ash":
      case "Squall":
      case "Tornado":
        return <img src={require(`../../images/50d.png`)} alt="alotof"></img>
      default:
        break;
    }
  };

  const GetIcon = () => {
    switch (iconID) {
      case "Clear":
        return <img src={require(`../../images/01d.png`)} alt="sunny"></img>

      case "Clouds":
        return <img src={require(`../../images/03d.png`)} alt="Clouds"></img>

      case "Rain":
        return <img src={require(`../../images/09d.png`)} alt="Rain"></img>

      case "Thunderstorm":
        return <img src={require(`../../images/11d.png`)} alt="Thunderstorm"></img>

      case "Drizzle":
        return <img src={require(`../../images/09d.png`)} alt="Drizzle"></img>

      case "Snow":
        return <img src={require(`../../images/13d.png`)} alt="Snow"></img>

      case "Mist":
      case "Fog":
      case "Smoke":
      case "Haze":
      case "Dust":
      case "Sand":
      case "Ash":
      case "Squall":
      case "Tornado":
        return <img src={require(`../../images/50d.png`)} alt="alotof"></img>
      default:
        break;
    }
  };

  return (

    <div className='flex flex-col md:flex-row md:justify-around sm:flex-row sm:justify-around xs:flex-col xs:justify-self-auto  h-screen lg:justify-around '>
   <img
        className="fixed h-full w-screen object-cover"
        src="sky.jpg"
        alt="photos"
      />
      <div className=" text-white text-center  rounded-lg p-1 box-content z-10 mt-8 sm:mt-15 ">
        <button className="text-white bg-blue-300 w-60 h-45 rounded-lg hover:bg-blue-400 p-1 " onClick={getLocation}>Anlık bilgileri al</button>
        <p>{status}</p>
        <div className="text-3xl font-bold  " >{data.name && <p>  {data.name} </p>}</div>
        <div className=" flex justify-center">{GetIcon1()}</div>
        <div className="text-lg ">{data.main && <p> sıcaklık: {Math.ceil(data.main.temp)}ºC  </p>}</div>
        <div className="text-lg " >{data.main && <p> hissedilen sıcaklık: {Math.ceil(data.main.feels_like)}ºC </p>}</div>
        <div className="text-lg "> {data.wind && <p> rüzgar hızı: {(data.wind.speed)} km/sa</p>}</div>
        <div className="text-lg">{data.main && <p> nem: {(data.main.humidity)}% </p>}</div>
        {data.weather && <p>hava : {(data.weather[0].description)}</p>}
        <div> {data.dt && <p>Tarih: {new Date(data.dt * 1000).toLocaleDateString()} </p>}</div>
      </div>
      <div className=" text-white  p-1 text-center rounded-lg  sm:mt-15 z-10">
        <div>
          <input className="text-black h-45 w-55 border-2 rounded-lg focus:outline-none"
            type="text"
            placeholder="şehir ismi giriniz"
            onChange={(e) => setSearch(e.target.value)}
            value={Search}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                cal()
              }
            }}
          />
          <button className="text-white  bg-blue-300 ml-2 rounded-lg hover:bg-blue-400 p-1 "
            onClick={cal}>
            ara
          </button>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-center ">  {day.name}  </div>
          <div className=" flex justify-center">{GetIcon()}</div>
          <div className="  ">{day.weather && <p> {(day.weather[0].description)}</p>}</div>
          <div className="">{day.main && <p> sıcaklık: {Math.round(day.main.temp)} ºC </p>} </div>
          <div className="float-left mr-1">{day.main && <p> min sıcaklık: {Math.round(day.main.temp_min)} ºC </p>} </div>
          <div className="ml-1 float-right">{day.main && <p> max sıcaklık: {Math.round(day.main.temp_max)} ºC </p>} </div>
          <div>{day.main && <p>Nem: {Math.round(day.main.humidity)}% </p>} </div>
          <div>{day.wind && <p> rüzgar hızı: {(day.wind.speed)}km/sa</p>}</div>
          <div>{day.dt && <p>Tarih: {new Date(day.dt * 1000).toLocaleDateString()} </p>}</div>
        </div>
      </div>
    </div>
  )
};