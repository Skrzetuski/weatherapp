import React from 'react';
import DefaultWeather from './default-weather';
import GeoWeather from './geolocation-weather';

function Main() {
  return (
    <div className="container" id="container">
      <DefaultWeather />
      <GeoWeather />
    </div>
  );
}

export default Main;
