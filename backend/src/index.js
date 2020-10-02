const Koa = require('koa',);
const router = require('koa-router',)();
const fetch = require('node-fetch',);
const cors = require('kcors',);

const appId = process.env.APPID || '';
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const targetCity = process.env.TARGET_CITY || 'Helsinki,fi';

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors(),);

const fetchGeoWeather = async (latitude, longitude, timestamps, units,) => {
  const endpoint = `${mapURI}/forecast?lat=${latitude}&lon=${longitude}&cnt=${timestamps}&units=${units}&appid=${appId}`;
  const response = await fetch(endpoint,);

  return response ? response.json() : {};
};

const fetchDefaultWeather = async () => {
  const endpoint = `${mapURI}/weather?q=${targetCity}&appid=${appId}&`;
  const response = await fetch(endpoint,);

  return response ? response.json() : {};
};

router.get('/api/weather', async (ctx,) => {
  const weatherData = await fetchDefaultWeather();

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData.weather ? weatherData.weather[0] : {};
},);

router.get('/api/geoweather/:lat/:lon/:timestamps/:units', async (ctx,) => {
  console.log(ctx.params,);
  const params = ctx.params;
  const geoWeather = await fetchGeoWeather(params.lat, params.lon, params.timestamps, params.units,);

  ctx.type = 'application/json; charset=utf-8';
  console.log(geoWeather,);
  ctx.body = geoWeather;
},);

app.use(router.routes(),);
app.use(router.allowedMethods(),);

app.listen(port,);

console.log(`App listening on port ${port}`,);
