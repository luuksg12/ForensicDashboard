FROM node:16
WORKDIR /src
COPY . . 
ENV HOST=0.0.0.0
RUN npm i 
RUN npm i local-cors-proxy
RUN npm i react-scripts
CMD ['npm', 'start']