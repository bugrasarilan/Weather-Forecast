import React from "react";
import {MdOutlineWbSunny} from "react-icons/md"
import {  BsCloudRainHeavy  } from "react-icons/bs"
import {  WiDayCloudy  } from "react-icons/wi"
import {FaRegSnowflake} from "react-icons/fa"
import {RiWindyFill} from "react-icons/ri"




export default function Index() {
  return <div className='flex'>Home Page 
  <div>
<h2>güneşli<MdOutlineWbSunny/> </h2>
<h2>yağmurlu <BsCloudRainHeavy/></h2>
<h2>parçalı bulutlu<WiDayCloudy/></h2>
<h2>karlı<FaRegSnowflake/></h2>
<h2>rüzgarlı<RiWindyFill/></h2>
</div>




  
  </div>;
}
