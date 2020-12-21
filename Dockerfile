FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV MONGO_HOST "host.docker.internal"

CMD ["npm", "start"] 