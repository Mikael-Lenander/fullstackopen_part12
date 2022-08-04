FROM node:16

WORKDIR /usr/src/app

COPY . .

ENV NODE_ENV=development

# Change npm ci to npm install since we are going to be in development mode
RUN npm install


CMD ["npm", "run", "dev"]