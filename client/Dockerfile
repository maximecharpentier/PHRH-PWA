# phrh-client

FROM node:10 as build

WORKDIR /home/node

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

# -----

FROM nginx:alpine

COPY --from=build /home/node/build /usr/share/nginx/html
