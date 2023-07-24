import Home from "./compund/Home";
import React, { useState,useEffect } from "react";
import axios from 'axios';
import "./App.css";

function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  },[]);

  const [city, updateCity] = useState(null);
  const API_KEY = "d90cbdbd16f51e57db9e2c8c862de71e" || "84664c4e96b20b69e6669cea247566e5" || "fe4feefa8543e06d4f3c66d92c61b69c";

  const url = (city)? `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`: lat && long?`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`:null;

  const [users, setUsers] = useState(null);

  const fetchUserData = () => {
    if (url) {
      axios.get(url)
        .then((response) => {
          return response.data; 
        })
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  };
  

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line
  },[users?.main?.temp]);

  return (
    <>
      <Home
        users={users}
        temp={(users?.main?.temp - 273).toFixed(2)}
        bimg={users?.weather[0]["icon"]}
        weather={users?.weather}
        description={users?.weather[0]["description"]}
        min={(users?.main?.temp_min - 273).toFixed(2)}
        max={(users?.main?.temp_max - 273).toFixed(2)}
        feels_like={(users?.main?.feels_like - 273).toFixed(2)}
        wind={users?.wind?.speed}
        humidity={users?.main?.humidity}
        clouds={users?.clouds?.all}
        name={users?.name}
        updateCity={updateCity}
        fetchUserData={fetchUserData}
      />
    </>
  );
}


export default App;



// ---------------------------------------fetch function use function-----------------------------------
  // const fetchUserData = () => {
  //   fetch(url)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setUsers(data);
  //     }).catch((error) => {
  //       console.error("Error fetching weather data:", error);
  //     });
  // };
