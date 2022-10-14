FROM node:14.17.0-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod
RUN echo $(ls -1 ./dist)


FROM nginx:1.20.1
COPY --from=build-step /app/dist/covid-ng-app /usr/share/nginx/html
EXPOSE 4200:80