# phrh-server

FROM node:10

WORKDIR /home/node

COPY package.json .

RUN npm install

COPY . . 

EXPOSE 3001

CMD ["npm", "start"]