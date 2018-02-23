FROM node:8.6 as node
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY ./ /app/
ARG env=prod
RUN npm run build-aot

FROM nginx:1.13
COPY --from=node /app/build/ /usr/share/nginx/html
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf
