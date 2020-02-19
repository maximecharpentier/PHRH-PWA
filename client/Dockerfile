# PHRH-client:0.1

# expand node:10 img as build folder
FROM node:10 as build
# work in /home/node dir
WORKDIR /home/node
# copy package.json to /home/node
COPY package*.json ./
# install deps
RUN npm install
# copy source code
COPY . ./
# declare global variable
# ARG REACT_APP_BACKEND_URL
# lauch default command
RUN npm run build

# Second Step - Server website

# expand nginx:alpine img
FROM nginx:alpine
# copy the build folder of the 1st img to the 2nd img 
COPY --from=build /home/node/build /usr/share/nginx/html
