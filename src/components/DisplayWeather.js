import { useState } from "react";

const DisplayWeather = (props) => {
  const [show, setShow] = useState(true);
  const { data } = props;

  const iconUrl =
  "http://openweathermap.org/img/w/" + `${data.cod != 404 ? data.weather[0].icon : null}` + ".png";
  return (
    <div>
      {data.cod != 404 ? (
        <>         
          <h1>
            {Math.floor(data.main.temp - 273.15)}
            &#176;  </h1>  
            <button className="btn" onClick={() => setShow(!show)}> {show ? "MORE" : "LESS"} </button>      
            {!show  && <div className="details" onClick={() => setShow(true)}>
                <div className="less-container"> 
                <p className="location">{data.name}, {data.sys.country}</p> 
                <p className="description">DESCRIPTION: {data.weather[0].description}</p>
                <p>HUMIDITY: {data.main.humidity}</p>
                <p>WIND SPEED: {data.wind.speed}</p>
            <img src={iconUrl} alt="" /> 
            </div> </div>}      
        </>         
      ) : (
        <h2>{data.message}</h2>
      )}     
   </div>    
  );
};

export default DisplayWeather;