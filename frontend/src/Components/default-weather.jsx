import React, { useState, useEffect } from 'react';

const baseURL = process.env.ENDPOINT;

function Weather() {
  const [icon, setIcon] = useState('');
  const [description, setDescription] = useState('');
  const [weather, setWeather] = useState('');

  const fetchDefaultWeather = async () => {
    const res = await fetch(`${baseURL}/weather`);
    return res.json();
  };

  const fillWeatherModel = (res) => {
    setWeather(res.main);
    setDescription(res.description);
    setIcon(res.icon.slice(0, -1));
  };

  useEffect(() => {
    fetchDefaultWeather().then((res) => {
      fillWeatherModel(res);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div className="card">
      { icon
        && (
        <>
          <h3>Now for Helsinki, Fi</h3>
          <img className="card-img-top" alt="..." src={`/img/${icon}.svg`} />
          <div className="card-body">
            <h5 className="card-title">
              Weather:
              {weather}
            </h5>
            <p className="card-text">{description}</p>
          </div>
        </>
        )}
    </div>
  );
}

export default Weather;
