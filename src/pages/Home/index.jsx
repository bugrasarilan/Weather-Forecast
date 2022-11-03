import { useState } from "react";
import axios from "axios";
import "../Home/index.css";

export default function Index() {
  const [status, setStatus] = useState(null);
  const [data, setData] = useState([]);
  const [day, setDay] = useState([]);
  const [Search, setSearch] = useState("");
  const [iconID, setIconID] = useState();




const KEY = process.env.REACT_APP_API_KEY;



  const getLocation = async () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Yükleniyor...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          console.log("position", position)
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          console.log("latitude,longitude", lat, lng)

          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${KEY}&units=metric`)
            .then((e) => {
              console.log("lat,lng alarak ", data)
              console.log("e.data", e.data.weather[0].id);
              setData(e.data);
            });
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  const cal = (e) => {
    if (e.key === "Enter")
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

    <div className='flex bg-primary-black h-100vh '>
      Home Page

      <div className=" text-white mt-1.5 rounded-lg p-1 box-content ">
        <button className="text-white bg-blue-300 w-60 h-45 mt-auto rounded-lg hover:bg-blue-400 p-1 " onClick={getLocation}>Anlık bilgileri al</button>
        <p>{status}</p>

        <div className="text-2xl  " >{data.name && <p>  {data.name} </p>}</div> 
       {/* <div> <img src={require(`../../images/${data.weather && (data.weather[0].main)}.png`)} alt="Snow" ></img></div> */}
        <div className="text-lg ">{data.main && <p> sıcaklık: {Math.ceil(data.main.temp)}ºC  </p>}</div>
        <div className="text-lg " >{data.main && <p> hissedilen sıcaklık: {Math.ceil(data.main.feels_like)}ºC </p>}</div>
        <div className="text-lg "> {data.wind && <p> rüzgar hızı: {(data.wind.speed)}</p>}</div>
        <div className="text-lg">{data.main && <p> nem: {(data.main.humidity)}% </p>}</div>

        {data.weather && (<p> havanın durumu:{data.weather.map((data) => data.main)}</p>)}

        {data.weather && <p>weather id: {(data.weather[0].id)}</p>}
        {data.weather && <p>hava özelliği: {(data.weather[0].description)}</p>}
       
{/* {day.weather && (day.weather[0].main)} */}

      </div>
      <div className=" text-white mt-1.5 p-1 text-center ">
        <div >
          <input className="text-black "
            type="text"
            placeholder="Search for places..."
            onChange={(e) => setSearch(e.target.value)}
            value={Search}
            onKeyPress={cal}
          >

          </input>
      
        </div>

        <div className=" m-auto  text-center  mt-2 ">
        <div className="text-4xl text-center ">  {day.name}  </div>


        <div className=" flex justify-center">{GetIcon()}</div>
        <div className="  ">{day.weather && <p> {(day.weather[0].description)}</p>}</div>
        <div className="">{day.main && <p> sıcaklık: {Math.round(day.main.temp)} ºC </p>} </div>
        <div className="float-left">{day.main && <p> min sıcaklık: {Math.round(day.main.temp_min)} ºC </p>} </div>
        <div className="ml-1 float-right">{day.main && <p> max sıcaklık: {Math.round(day.main.temp_max)} ºC </p>} </div>

        <div className="">{day.main && <p>Nem: {Math.round(day.main.humidity)} % </p>} </div>

        <div className=" "> {day.wind && <p> rüzgar hızı: {(day.wind.speed)}</p>}</div>
        <div> {day.dt && <p>Tarih: {new Date(day.dt * 1000).toLocaleDateString()} </p>}</div>
   
       </div>
      </div>
    </div>



  )
};