import React, { useEffect, useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { BsCloudRainHeavy } from "react-icons/bs";
import { WiDayCloudy } from "react-icons/wi";
import { FaRegSnowflake } from "react-icons/fa";
import { RiWindyFill } from "react-icons/ri";
import GetWeather from "../../api";

export default async function Index() {
  console.log("dd", window.navigator.geolocation);
  const location = window.navigator.geolocation;

  const [myLocationInfo, setMyLocationInfo] = useState();

  console.log("location", location);
  useEffect(() => {
    if (location) {
      location.getCurrentPosition((position) => {
        //enlem boylam bilgisini al
        console.log("position.coords.latitude", position.coords.latitude);

        //aldığın enlem boylam bilgisini api'ya yolla ve hava durumu bilgisini al
        GetWeather(position.coords.latitude, position.coords.longitude).then(
          (e) => {
            console.log("response", e);

            //aldığın hava durumu bilgisin myLocationInfo'ya kaydet
            setMyLocationInfo(e);
          }
        );
      });
    }
  }, [location]);

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
    </div>
  );
}
