
FROM node:latest

WORKDIR /usr/src/app

COPY . .

EXPOSE 9090

CMD npm start