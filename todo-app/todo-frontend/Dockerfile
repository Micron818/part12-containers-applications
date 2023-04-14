FROM node:16 AS build-stage
WORKDIR /usr/src/app

COPY . .

RUN npm set fetch-retry-mintimeout = 30000

RUN npm ci

# ENV REACT_APP_BACKEND_URL=http://192.168.56.2:3000

RUN CI=true npm test

RUN npm run build

FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
