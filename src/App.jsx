import React, { useEffect, useState } from 'react'
import axios from 'axios';


export default function App() {


  let [weather,setWeather] = useState({

    date: '',
    img: '',
    weaText: '',
    weaDet: '',
    deg: '',
    degLike: '',
    wind: '',
    pres: '',
    humd: '',
    visib: '',
    
  });


  let [val,setVal] = useState('2950159');

  const values = [
    { id: '282239', text: "Ramallah - PS" },
    { id: '2643743', text: "London - GB" },
    { id: '3117735', text: "Madrid - ESP" },
    { id: '2950159', text: "Berlin - DE" },
    { id: '323786', text: "Ankara - TUR" },
  ]; 

  function selectedOption(option){

    let oldVal = {...val};
    oldVal = values.filter( (val) => option.target.value === val.text)[0].id;
    setVal(oldVal);
    getWeather(val);

  }

   async function getWeather(val){

    let response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=${val}&appid=2adaf5d0a3ee58d8fe2b1468ddf8c184`);
    let data = response.data.list[0];
    console.log(data);
    let oldWeather = {...weather};
    //Date
    oldWeather.date = data.dt_txt;

    //Image
    let imgName = data.weather[0].icon;
    let imgSrc = `./imgs/${imgName}.png`
    oldWeather.img = imgSrc;

     //Main Weather
     oldWeather.weaText = data.weather[0].main;

     //Detailed Weather
     oldWeather.weaDet = data.weather[0].description;

     //Degrre
     let temp = data.main.temp - 273.15;
     temp = Math.round(temp);
     oldWeather.deg = temp;

     //Degrre Like
     let tempLike = data.main.feels_like - 273.15;
     tempLike = Math.round(temp);
     oldWeather.degLike = tempLike;

     //Wind
     oldWeather.wind = data.wind.speed;

     //Visibilty
     oldWeather.visib = data.visibility;

     //Humidty
     oldWeather.humd = data.main.humidity;

     //Pressure
     oldWeather.pres = data.main.pressure;  

    setWeather(oldWeather);
  }

  useEffect(() => {
    // Function to run once when component is mounted
    getWeather(val);
    
    // Cleanup function (optional)
    return () => {
      console.log('Component unmounted');
    };
  }, []); // Empty dependency array
  return (
<div className="container d-flex flex-column justify-content-center align-item-center">
    <div className="cityDet d-flex justify-content-around align-item-center mb-4">
        <div id="styled-select">   
          <select onChange={selectedOption} name="group" id="group">
            <option  val={values[0]}>{values[0].text}</option>
            <option  val={values[1]}>{values[1].text}</option>
            <option  val={values[2]}>{values[2].text}</option>
            <option  val={values[3]} selected="selected">{values[3].text}</option>
            <option  val={values[4]}>{values[4].text}</option>
          </select>   
        </div> 
        <h1 className='w-50 text-center'>{weather.date}</h1>
    </div>  
    <div>
      <div className="mySection d-flex justify-content-around align-item-center">
        <div className="d-flex flex-column justify-content-center align-item-center text-center">
          <div className="w-img">
            <img src={weather.img} alt='weather-image'></img>
          </div>
          <h2>{weather.weaText}</h2>
          <p>{weather.weaDet}</p>
        </div>
        <div className='d-flex flex-column justify-content-center align-item-center'>
          <h2>{weather.deg}°C</h2>
          <p>Feels Like {weather.degLike}°C</p>
        </div>
      </div>
      <div className="d-flex justify-content-around align-item-center mySection">
        <div className="text-center">
          <h3>Wind</h3>
          <p>{weather.wind} Km/h</p>
        </div>
        <div className="text-center">
          <h3>Pressure</h3>
          <p>{weather.pres}</p>
        </div>
        <div className="text-center">
          <h3>Humidity</h3>
          <p>{weather.humd}%</p>
        </div>
        <div className="text-center">
          <h3>Visibility</h3>
          <p>{weather.visib} Km</p>
        </div>
      </div>
    </div>

</div>
  )
}
