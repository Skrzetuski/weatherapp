FROM node:14 AS weatherapp_backend

ENV MAP_ENDPOINT="http://api.openweathermap.org/data/2.5"
ENV TARGET_CITY="Helsinki,fi"
ENV PORT=9000

WORKDIR /app
COPY . ./weatherapp_backend

WORKDIR /app/weatherapp_backend
RUN npm install

EXPOSE 9000

CMD ["npm", "run-script","dev"]