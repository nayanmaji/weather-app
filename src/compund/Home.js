import React, { useState,useEffect } from "react";

export default function Home(props) {

// --------------------------------to get time every sec(start)------------------------------
  const [time, setTime] = useState();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds());
    };

    // Update time every 1000ms (1 second)
    const interval = setInterval(updateTime, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty array means this effect runs only once, on component mount
// -------------------------------------------end-----------------------------------------

const icon = props.weather?.length > 0
  ? `https://openweathermap.org/img/wn/${props.weather[0]["icon"]}@2x.png`
  : null;


  const onSubmit = (e) => {
    e.preventDefault();
    props.fetchUserData();
  };
  

  return (
    <>
      <div className=" login-box" ><div className="container">
        <div className={"d"+props.bimg}>
          <div className="row ">
            {/* ------------------------------1st--------------------------------- */}
            <div className="col-7 d-flex align-items-end">
              <div className="d-flex flex-row mb-3">
                <div className="p-2">
                  <h1>{props.temp}&deg;</h1>
                </div>
                <div className="p-2">
                  <h3>{props.name}</h3>
                  <p>{time}</p>
                </div>
                <div className="p-2">
               <img className="city-icon" style={{ margin: '0 auto', display: 'block',height:'3rem' }} src={icon} alt="weather"/> 
                  <p>{props.description}</p>
                </div>
              </div>
            </div>
            {/* ----------------------------2nd div-------------------------------- */}
            <div className="container col4 p-4 right-box">
              <div className="input-group sch justify-content-center ">
                <form className="d-flex justify-content-center" onSubmit={onSubmit}>
                  <input
                    type="search"
                    id="form1"
                    className="form-control rounded"
                    onChange={(e) => props.updateCity(e.target.value)}
                  />
                  <button type="submit" className="btn btn-outline-primary">
                    <i className="fas fa-search"></i>
                  </button>
                </form>
              </div>
              <div className="my-2">
                <img className="city-icon d-flex justify-content-center" style={{ margin: '0 auto', display: 'block' }} src={icon} alt='weather'/>
                  <h5 className="d-flex justify-content-center">{props.description}</h5>
                </div>
              <div className="container cnt">
                <h4 className="mb-4 ">Weather Details</h4>
                <div className="d-flex bd-highlight">
                  <div className="p-2 w-100 bd-highlight">Cloudy</div>
                  <div className="p-2 flex-shrink-1 bd-highlight">
                    {props.clouds}%
                  </div>
                </div>
                <div className="d-flex bd-highlight">
                  <div className="p-2 w-100 bd-highlight">Humidity</div>
                  <div className="p-2 flex-shrink-1 bd-highlight">
                    {props.humidity}%
                  </div>
                </div>
                <div className="d-flex bd-highlight">
                  <div className="p-2 w-100 bd-highlight">Wind</div>
                  <div className="p-2 flex-shrink-1 bd-highlight">
                    {props.wind}km/h
                  </div>
                </div>
                <div className="d-flex bd-highlight">
                  <div className="p-2 w-100 bd-highlight">Feels like</div>
                  <div className="p-2 flex-shrink-1 bd-highlight">
                    {props.feels_like}&deg;
                  </div>
                </div>
                <div className="d-flex bd-highlight">
                  <div className="p-2 w-100 bd-highlight">Max temp.</div>
                  <div className="p-2 flex-shrink-1 bd-highlight">
                    {props.max}&deg;
                  </div>
                </div>
                <div className="d-flex bd-highlight">
                  <div className="p-2 w-100 bd-highlight">Min temp.</div>
                  <div className="p-2 flex-shrink-1 bd-highlight">
                    {props.min}&deg;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div></div>
    </>
  );
}
