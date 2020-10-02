/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import WeatherCard from './weather-card';

const baseURL = process.env.ENDPOINT;

function GeolocationWeather() {
  const [geolocation, setGeolocation] = useState({});
  const [successFlag, SetSuccessFlag] = useState(false);
  const [geoWeather, setGeoWeather] = useState({});
  const units = 'metric';
  const timestamps = 16;

  const success = (position) => {
    setGeolocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    SetSuccessFlag(true);
  };

  const error = () => {
    console.log('Sorry, no position available.');
    SetSuccessFlag(false);
  };

  const fetchWeather = async (position) => {
    const res = await fetch(`${baseURL}/geoweather/${position.latitude}/${position.longitude}/${timestamps}/${units}`);
    return res.json();
  };

  const fillWeatherModel = (res) => {
    setGeoWeather({
      city: res.city.name,
      country: res.city.country,
      list: res.list,
    });
  };

  useEffect(() => {
    const watcher = navigator.geolocation.watchPosition(success, error);
    return () => {
      watcher.clearWatch(watcher);
    };
  }, []);

  useEffect(() => {
    if (successFlag) {
      fetchWeather(geolocation).then((res) => {
        fillWeatherModel(res);
      });
    }
  }, [successFlag]);

  return (
    <div>
      {geoWeather.city
        ? (<WeatherCard props={geoWeather} />)
        : <p>Sorry, no position available.</p>}
    </div>
  );
}

export default GeolocationWeather;
