import { useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { BsCloudRainHeavy } from "react-icons/bs";
import { WiDayCloudy } from "react-icons/wi";
//import { FaRegSnowflake } from "react-icons/fa";
//import { RiWindyFill } from "react-icons/ri";
import axios from "axios";
import "../Home/index.css";

export default function Index() {
  const [status, setStatus] = useState(null);
  const [data, setData] = useState([]);
  const [iconID, setIconID] = useState();
  const [day, setDay] = useState([]);



  const API_KEY = "be9bd55124f63aff70a7e516541d543f";


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




          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric`)
            .then((e) => {
              console.log("lat,lng alarak ", data)
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

  const Location = () => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        


        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
          .then((r) => {
            console.log("5 day 3 hours", day)
            setDay(r.data)

          });


      },

    );
  };










  //800 clear  500,501 rain
  // 802, 803, 804 clouds


  const GetIcon = () => {
    switch (data.weather[0].id) {
      case 800: <MdOutlineWbSunny />
        return;

      case 801: <WiDayCloudy />
        return;

      case 804:
        // clouds bulutlu//;
        break;
      case 500:
        <BsCloudRainHeavy />
        break;

      default:
        break;
    }

  };




  return (

    <div className='flex bg-primary-black h-100vh '>
      Home Page
      {/* <div>
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
      <button className="bg-blue-100 w-50 h-20" onClick={getLocation}>konum bilgilerini al</button>
     <div >
        
        <p>{status}</p>

        {data.name && <p> şehir: {data.name} </p>}
        {data.sys && <p> ülke: {(data.sys.country)} </p>}
        {data.main && <p> sıcaklık: {Math.ceil(data.main.temp)}ºC </p>}
        {data.main && <p> nem: {(data.main.humidity)}% </p>}
        {data.main && <p> basınç: {(data.main.pressure)} hPa </p>}
        {data.weather && (<p> havanın durumu:{data.weather.map((data) => data.main)}</p>)} 
        {data.weather && <p> havanın özelliği:{data.weather.map(data => data.description)}  </p>}
        {data.wind && <p> rüzgar hızı:{(data.wind.speed)}</p> } 

      </div >    */}

      <div className="text-white  m-auto mt-1.5 rounded-lg p-1 box-content ">
        <button className="text-white bg-gray-400 w-60 h-45 mt-auto rounded-lg hover:bg-gray-500 p-1 " onClick={getLocation}>Anlık bilgileri al</button>
        <p>{status}</p>
        <div className="float-right text-4xl p" > {iconID && <GetIcon />}</div>
        <div className="text-2xl  " >{data.name && <p>  {data.name} </p>}</div>
        <div className="text-lg ">{data.main && <p> sıcaklık: {Math.ceil(data.main.temp)}ºC  </p>}</div>
        <div className="text-lg " >{data.main && <p> hissedilen sıcaklık: {Math.ceil(data.main.feels_like)}ºC </p>}</div>
        <div className="text-lg "> {data.wind && <p> rüzgar hızı: {(data.wind.speed)}</p>}</div>
        <div className="text-lg">{data.main && <p> nem: {(data.main.humidity)}% </p>}</div>

        {data.weather && (<p> havanın durumu:{data.weather.map((data) => data.main)}</p>)}

        {data.weather && <p>weather id: {(data.weather[0].id)}</p>}




      </div>
      <div className=" text-white m-auto  mt-1.5 p-1  flex  ">
              <div className=""> <button className=" text-white  bg-gray-400 w-60 h-45 mb-5 rounded-lg hover:bg-gray-500 p-1   " onClick={Location}>3 saatlik bilgileri al</button> </div>

        {/* <p>{status}</p> */}


        <div className="text-white  m-auto mt-1 mr-3 rounded-lg p-1 box-content " >
          <div className="float-right text-4xl p" > {iconID && <GetIcon />}</div>
          <div className="text-2xl"> {day.city && <p>{(day.city.name)} </p>} </div>
          <div className="text-lg ">{day.list && <p>sıcaklık: {Math.ceil(day.list[0].main.temp)}ºC</p>}</div>
          <div className="text-lg " >{day.list && <p> hissedilen sıcaklık: {Math.ceil(day.list[0].main.feels_like)}ºC </p>}</div>
          <div className="text-lg "> {day.list && <p>nem: {(day.list[0].main.humidity)}%</p>}</div>
          <div className="text-lg " >  {day.list && <p>rüzgar hızı: {(day.list[0].wind.speed)}</p>}</div>
          <div className="text-lg " > {day.list && <p>havanın durumu: {(day.list[0].weather[0].main)}</p>}</div>
          <div className="text-lg ">  {day.list && <p> time: {(day.list[0].dt_txt)}</p>}  </div>
          <div> {day.list && <p>Tarih: {new Date(day.list[0].dt * 1000).toLocaleDateString()} </p>}</div>

        </div>

        <div className="  text-white   m-auto mt-1 mr-3 rounded-lg p-1 box-content " >
          <div className="float-right text-4xl p" > {iconID && <GetIcon />}</div>
          <div className="text-2xl"> {day.city && <p>{(day.city.name)} </p>} </div>
          <div className="text-lg ">{day.list && <p>sıcaklık: {Math.ceil(day.list[1].main.temp)}ºC</p>}</div>
          <div className="text-lg " >{day.list && <p> hissedilen sıcaklık: {Math.ceil(day.list[1].main.feels_like)}ºC </p>}</div>
          <div className="text-lg "> {day.list && <p>nem: {(day.list[1].main.humidity)}%</p>}</div>
          <div className="text-lg " >  {day.list && <p>rüzgar hızı: {(day.list[1].wind.speed)}</p>}</div>
          <div className="text-lg " > {day.list && <p>havanın durumu: {(day.list[1].weather[0].main)}</p>}</div>
          <div className="text-lg ">  {day.list && <p> time: {(day.list[1].dt_txt)}</p>}  </div>
          <div> {day.list && <p>Tarih: {new Date(day.list[0].dt * 1000).toLocaleDateString()} </p>}</div>

        </div>

        <div className=" text-white  m-auto mt-1. rounded-lg p-1 box-content " >
          <div className="float-right text-4xl p" > {iconID && <GetIcon />}</div>
          <div className="text-2xl"> {day.city && <p>{(day.city.name)} </p>} </div>
          <div className="text-lg ">{day.list && <p>sıcaklık: {Math.ceil(day.list[2].main.temp)}ºC</p>}</div>
          <div className="text-lg " >{day.list && <p> hissedilen sıcaklık: {Math.ceil(day.list[2].main.feels_like)}ºC </p>}</div>
          <div className="text-lg "> {day.list && <p>nem: {(day.list[2].main.humidity)}%</p>}</div>
          <div className="text-lg " >  {day.list && <p>rüzgar hızı: {(day.list[2].wind.speed)}</p>}</div>
          <div className="text-lg " > {day.list && <p>havanın durumu: {(day.list[2].weather[0].main)}</p>}</div>
          <div className="text-lg ">  {day.list && <p> time: {(day.list[2].dt_txt)}</p>}  </div>
          <div> {day.list && <p>Tarih: {new Date(day.list[0].dt * 1000).toLocaleDateString()} </p>}</div>
        </div>

      </div>

    </div>



  )
}
