FROM node:16
COPY . . 
RUN npm i 
RUN npm i local-cors-proxy