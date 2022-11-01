import React from "react";
import axios from "axios";
import { useState } from "react";

export default function Index() {
   // const city = "istanbul"
   const API_KEY = "be9bd55124f63aff70a7e516541d543f";
   const [day, setDay] = useState([]);
   const [Search, setSearch] = useState("");


   const cal = (e) => {
      axios.get(`https://api.openweathermap.org/data/2.5/weatherq=${Search}&lang=tr&appid=${API_KEY}&units=metric`)
         .then((r) => {
            console.log("şehir bilgisi ", day)
            setDay(r.data)
            console.log("day", r.data)
            setSearch("")
         });
   };

   return (
      <div className="bg-blue-200">
         detail
         {/* <button className="text-white bg-gray-400 w-6 h-4 mt-auto rounded-lg hover:bg-gray-500 p-1 " onClick={get}>bilgileri getir</button>
         <div className="text-2xl "> {day.main && <p>{Math.round(day.main.temp)} </p>} </div>
         <div className="text-2xl "> {day && <p>{(day.name)} </p>} </div> */}
         <div>
            <div>
               <form >
                  <input
                     type="text"
                     placeholder="Search for places..."
                     onChange={(e) => setSearch(e.target.value)}
                     value={Search}
                  >
                  </input>
                  <button onClick={cal}> bul</button>
               </form>
            </div>
         </div>
      </div>
   )
};










