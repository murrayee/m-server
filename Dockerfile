FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app


EXPOSE 9090

CMD npm run docker