FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN CI=true npm test

ENV NODE_ENV production

RUN npm run build

RUN npm install -g serve

CMD serve -p 3000 build
