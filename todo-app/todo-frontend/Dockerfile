FROM node:16 AS build-stage


WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL http://localhost:8080/api
ENV NODE_ENV production

RUN npm ci

RUN CI=true npm test

RUN npm run build

RUN npm install -g serve

CMD serve -p 3000 build
