import React from "react";
import axios from "axios";
import { useState } from "react";

export default function Index() {

   const KEY =process.env.REACT_APP_API_KEY; 
   const [day, setDay] = useState([]);
   const [hour, setHour] = useState([]);
   const [Search, setSearch] = useState(""); 

   const cal = (e) => {
      if (e.key === "Enter")
         axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${Search}&lang=tr&appid=${KEY}&units=metric`)
            .then((hour) => {
               console.log("şehir bilgisi ", hour)
               setHour(hour.data)
               console.log("setHour", hour)
               setSearch("")

            });
   };

   const Location = () => {
      window.navigator.geolocation.getCurrentPosition(
         (position) => {
            const lat = position.coords.latitude
            const lng = position.coords.longitude

            axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${KEY}&units=metric`)
               .then((r) => {
                  console.log("5 day 3 hours", day)
                  setDay(r.data)

               });
         },
      );
   };

   return (
      <div className="flex flex-col md:flex-row bg-primary-black  h-screen lg:justify-around ">
         <div className=" text-white  text-center ">
            <div >
               <input className="text-black"
                  type="text"
                  placeholder="Search for places..."
                  onChange={(e) => setSearch(e.target.value)}
                  value={Search}
                  onKeyPress={cal}
               >
               </input>
               <button onClick={cal}> bul</button>

            </div>
            <div className="text-2xl ">  {hour.name}  </div>
            <div className="text-2xl "> {hour.main && <p>{Math.round(hour.main.temp)} </p>} </div>
            <div className="text-lg "> {hour.wind && <p> rüzgar hızı: {(hour.wind.speed)}</p>}</div>
            {hour.weather && <p>hava özelliği: {(hour.weather[0].description)}</p>}
            {hour.weather && <p>havanın durumu {(hour.weather[0].main)}</p>}
         </div>
         
         <div className=" text-white   mt-1.5 p-1  flex flex-row  ">
            <div className=" "> <button className=" text-white  bg-gray-400 w-60 h-45 mb-5 rounded-lg hover:bg-gray-500 p-1   " onClick={Location}>3 saatlik bilgileri al</button> </div>
            <div className="text-white mt-1 mr-3 rounded-lg p-1 box-content " >
               <div className="text-2xl"> {day.city && <p>{(day.city.name)} </p>} </div>
               <div className="text-lg ">{day.list && <p>sıcaklık: {Math.ceil(day.list[0].main.temp)}ºC</p>}</div>
               <div className="text-lg " >{day.list && <p> hissedilen sıcaklık: {Math.ceil(day.list[0].main.feels_like)}ºC </p>}</div>
               <div className="text-lg "> {day.list && <p>nem: {(day.list[0].main.humidity)}%</p>}</div>
               <div className="text-lg " >  {day.list && <p>rüzgar hızı: {(day.list[0].wind.speed)}</p>}</div>
               <div className="text-lg " > {day.list && <p>havanın durumu: {(day.list[0].weather[0].main)}</p>}</div>
               <div className="text-lg ">  {day.list && <p> time: {(day.list[0].dt_txt)}</p>}  </div>
               <div> {day.list && <p>Tarih: {new Date(day.list[0].dt * 1000).toLocaleDateString()} </p>}</div>
            </div>

            <div className="  text-white    mt-1 mr-3 rounded-lg p-1 box-content " >
               <div className="text-2xl"> {day.city && <p>{(day.city.name)} </p>} </div>
               <div className="text-lg ">{day.list && <p>sıcaklık: {Math.ceil(day.list[1].main.temp)}ºC</p>}</div>
               <div className="text-lg " >{day.list && <p> hissedilen sıcaklık: {Math.ceil(day.list[1].main.feels_like)}ºC </p>}</div>
               <div className="text-lg "> {day.list && <p>nem: {(day.list[1].main.humidity)}%</p>}</div>
               <div className="text-lg " >  {day.list && <p>rüzgar hızı: {(day.list[1].wind.speed)}</p>}</div>
               <div className="text-lg " > {day.list && <p>havanın durumu: {(day.list[1].weather[0].main)}</p>}</div>
               <div className="text-lg ">  {day.list && <p> time: {(day.list[1].dt_txt)}</p>}  </div>
               <div> {day.list && <p>Tarih: {new Date(day.list[1].dt * 1000).toLocaleDateString()} </p>}</div>
            </div>

            <div className=" text-white   mt-1 rounded-lg p-1 box-content " >
               <div className="text-2xl"> {day.city && <p>{(day.city.name)} </p>} </div>
               <div className="text-lg ">{day.list && <p>sıcaklık: {Math.ceil(day.list[2].main.temp)}ºC</p>}</div>
               <div className="text-lg " >{day.list && <p> hissedilen sıcaklık: {Math.ceil(day.list[2].main.feels_like)}ºC </p>}</div>
               <div className="text-lg "> {day.list && <p>nem: {(day.list[2].main.humidity)}%</p>}</div>
               <div className="text-lg " >  {day.list && <p>rüzgar hızı: {(day.list[2].wind.speed)}</p>}</div>
               <div className="text-lg " > {day.list && <p>havanın durumu: {(day.list[2].weather[0].main)}</p>}</div>
               <div className="text-lg ">  {day.list && <p> time: {(day.list[2].dt_txt)}</p>}  </div>
               <div> {day.list && <p>Tarih: {new Date(day.list[2].dt * 1000).toLocaleDateString()} </p>}</div>
            </div>

            <div className=" text-white   mt-1 rounded-lg p-1 box-content " >
               <div className="text-2xl"> {day.city && <p>{(day.city.name)} </p>} </div>
               <div className="text-lg ">{day.list && <p>sıcaklık: {Math.ceil(day.list[3].main.temp)}ºC</p>}</div>
               <div className="text-lg " >{day.list && <p> hissedilen sıcaklık: {Math.ceil(day.list[3].main.feels_like)}ºC </p>}</div>
               <div className="text-lg "> {day.list && <p>nem: {(day.list[3].main.humidity)}%</p>}</div>
               <div className="text-lg " >  {day.list && <p>rüzgar hızı: {(day.list[3].wind.speed)}</p>}</div>
               <div className="text-lg " > {day.list && <p>havanın durumu: {(day.list[3].weather[0].main)}</p>}</div>
               <div className="text-lg ">  {day.list && <p> time: {(day.list[3].dt_txt)}</p>}  </div>
               <div> {day.list && <p>Tarih: {new Date(day.list[3].dt * 1000).toLocaleDateString()} </p>}</div>
            </div>

            <div className=" text-white   mt-1 rounded-lg p-1 box-content " >
               <div className="text-2xl"> {day.city && <p>{(day.city.name)} </p>} </div>
               <div className="text-lg ">{day.list && <p>sıcaklık: {Math.ceil(day.list[4].main.temp)}ºC</p>}</div>
               <div className="text-lg " >{day.list && <p> hissedilen sıcaklık: {Math.ceil(day.list[4].main.feels_like)}ºC </p>}</div>
               <div className="text-lg "> {day.list && <p>nem: {(day.list[4].main.humidity)}%</p>}</div>
               <div className="text-lg " >  {day.list && <p>rüzgar hızı: {(day.list[4].wind.speed)}</p>}</div>
               <div className="text-lg " > {day.list && <p>havanın durumu: {(day.list[4].weather[0].main)}</p>}</div>
               <div className="text-lg ">  {day.list && <p> time: {(day.list[4].dt_txt)}</p>}  </div>
               <div> {day.list && <p>Tarih: {new Date(day.list[4].dt * 1000).toLocaleDateString()} </p>}</div>
            </div>

            <div className=" text-white  mt-1 rounded-lg p-1 box-content " >
               <div className="text-2xl"> {day.city && <p>{(day.city.name)} </p>} </div>
               <div className="text-lg ">{day.list && <p>sıcaklık: {Math.ceil(day.list[5].main.temp)}ºC</p>}</div>
               <div className="text-lg " >{day.list && <p> hissedilen sıcaklık: {Math.ceil(day.list[5].main.feels_like)}ºC </p>}</div>
               <div className="text-lg "> {day.list && <p>nem: {(day.list[5].main.humidity)}%</p>}</div>
               <div className="text-lg " >  {day.list && <p>rüzgar hızı: {(day.list[5].wind.speed)}</p>}</div>
               <div className="text-lg " > {day.list && <p>havanın durumu: {(day.list[5].weather[0].main)}</p>}</div>
               <div className="text-lg ">  {day.list && <p> time: {(day.list[5].dt_txt)}</p>}  </div>
               <div> {day.list && <p>Tarih: {new Date(day.list[5].dt * 1000).toLocaleDateString()} </p>}</div>
            </div>

            <div className=" text-white  mt-1 rounded-lg p-1 box-content " >
               <div className="text-2xl"> {day.city && <p>{(day.city.name)} </p>} </div>
               <div className="text-lg ">{day.list && <p>sıcaklık: {Math.ceil(day.list[6].main.temp)}ºC</p>}</div>
               <div className="text-lg " >{day.list && <p> hissedilen sıcaklık: {Math.ceil(day.list[6].main.feels_like)}ºC </p>}</div>
               <div className="text-lg "> {day.list && <p>nem: {(day.list[6].main.humidity)}%</p>}</div>
               <div className="text-lg " >  {day.list && <p>rüzgar hızı: {(day.list[6].wind.speed)}</p>}</div>
               <div className="text-lg " > {day.list && <p>havanın durumu: {(day.list[6].weather[0].main)}</p>}</div>
               <div className="text-lg ">  {day.list && <p> time: {(day.list[6].dt_txt)}</p>}  </div>
               <div> {day.list && <p>Tarih: {new Date(day.list[6].dt * 1000).toLocaleDateString()} </p>}</div>
            </div>

            <div className=" text-white  mt-1 rounded-lg p-1 box-content " >
               <div className="text-2xl"> {day.city && <p>{(day.city.name)} </p>} </div>
               <div className="text-lg ">{day.list && <p>sıcaklık: {Math.ceil(day.list[7].main.temp)}ºC</p>}</div>
               <div className="text-lg " >{day.list && <p> hissedilen sıcaklık: {Math.ceil(day.list[7].main.feels_like)}ºC </p>}</div>
               <div className="text-lg "> {day.list && <p>nem: {(day.list[7].main.humidity)}%</p>}</div>
               <div className="text-lg " >  {day.list && <p>rüzgar hızı: {(day.list[7].wind.speed)}</p>}</div>
               <div className="text-lg " > {day.list && <p>havanın durumu: {(day.list[7].weather[0].main)}</p>}</div>
               <div className="text-lg ">  {day.list && <p> time: {(day.list[7].dt_txt)}</p>}  </div>
               <div> {day.list && <p>Tarih: {new Date(day.list[7].dt * 1000).toLocaleDateString()} </p>}</div>
            </div>
         </div>
      </div>
   )
};






