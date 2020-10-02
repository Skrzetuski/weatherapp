/* eslint-disable react/prop-types */
import React from 'react';

function WeatherCard({ props }) {
  const { city, country, list } = props;

  return (
    <>
      <br />
      <br />
      <h3>
        {city}
        {', '}
        {country}
      </h3>
      <div className="card-columns">
        {list.map((eles) => {
          const time = eles.dt_txt;
          const temperature = eles.main.temp;

          return (eles.weather.map((e, i) => {
            const title = e.main;
            const descriptionWeather = e.description;
            const icon = e.icon.slice(0, -1);

            return (
              <div key={i.toString()} className="card">
                <h3>{time}</h3>
                <img className="card-img-top" alt="..." src={`/img/${icon}.svg`} />
                <div className="card-body">
                  <h5 className="card-title">
                    Weather:
                    {title}
                  </h5>
                  <p className="card-text">
                    {temperature}
                    *C and
                    {' '}
                    {descriptionWeather}
                  </p>
                </div>
              </div>
            );
          }));
        })}
      </div>
    </>
  );
}

export default WeatherCard;
