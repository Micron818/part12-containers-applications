FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm set fetch-retry-mintimeout = 20000 
RUN npm set fetch-retry-maxtimeout = 120000 
RUN npm set fetch-retries=5 
RUN npm ci

CMD ["npm", "start"]