FROM node:14 AS weatherapp_frontend

ENV process.env.ENDPOINT="http://0.0.0.0:9000/api"
ENV process.env.HOST="0.0.0.0"
ENV process.env.PORT=8000

WORKDIR /app
COPY . ./weatherapp_frontend

WORKDIR /app/weatherapp_frontend
RUN npm install

EXPOSE 8000

CMD [ "npm", "start" ]