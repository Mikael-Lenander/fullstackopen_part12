FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --omit=dev

ENV NODE_ENV production
ENV PORT 3003

RUN --mount=type=secret,id=test_db_uri --mount=type=secret,id=access_token_secret \
 TEST_DB_URI_FILE=/run/secrets/test_db_uri ACCESS_TOKEN_SECRET_FILE=/run/secrets/access_token_secret NODE_ENV=test \
 npx --verbose --runInBand

USER node

CMD npm start