import { useState } from "react";
import DisplayWeather from "./DisplayWeather";
import sun from "../assets/sun.png";
import search from "../assets/search.png";

const Weather = () => {  
  const [showSearch, setShowSearch] = useState(true);
  const [weather, setWeather] = useState([]);
  const [input, setInput] = useState({
    city: "",
    country: "",
  });

  const APIKEY = "e48280804b26dc87b6a2b9a8162ae551";

  async function weatherData(e){
     e.preventDefault();
     if(input.city === ""){
         alert("Add a city");
     }else{
        const data = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${input.city},${input.country}&APPID=${APIKEY}`
          )
            .then((res) => res.json())
            .then((data) => (data));
    
        setWeather({ data: data });    
     }  
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "city") {
      setInput({ ...input, city: value });
    } 
    if (name === "country") {
      setInput({ ...input, country: value });
    }    
}
    const date = new Date();
    const dayWeek = date.toLocaleString("default", { weekday: "long" });
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const greet = date.getHours();

  return (
    <div className="weather-container">
        <div>
          <img
            className="search"
            src={search}
            alt="search"
            onClick={() => setShowSearch(!showSearch)}
          />
        </div>

        {!showSearch ? (
          <div onClick={() => setShowSearch(true)}></div>
        ) : (
          <>
           <form>
                <div>
                    <input className="input-css" type="text" name="city" placeholder="city" onChange={(e) => handleChange(e)} />
                    <input className="input-css" type="text" name="country" placeholder="country" onChange={(e) => handleChange(e)} />
                </div>
                <button className="submit-css" onClick={(e) => weatherData(e)}>Submit</button>
          </form>
          </>
        )}

        <div className="weather-intro">
          <img className="sun" src={sun} alt="sun" />
          <div className="weather">
            <p className="weather-day">
              {dayWeek}, {day} {month}
            </p>
            <p className="weather-greeting">
              {greet < 12 ? "GOOD MORNING" : greet >= 12 && greet <= 17 ? "GOOD AFTERNOON" : "GOOD EVENING"}
            </p>
          </div>
        </div>   
      {
          weather.data !== undefined ?
          <div>
             <DisplayWeather data={weather.data} />
          </div>
          : null
      }       
    </div>
  );
};

export default Weather;
