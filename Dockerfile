FROM node:16

WORKDIR /api

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "src/index.js" ]