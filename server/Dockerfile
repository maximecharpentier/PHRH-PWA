# phrh-fake-server:0.6

# expand node:10 img
FROM node:10
# work in /home/node dir
WORKDIR /home/node
# copy package.json to /home/node
COPY package.json .
# install deps
RUN npm install
# copy source code
COPY . .
# lauch default command
CMD ["npm", "run", "serve"]