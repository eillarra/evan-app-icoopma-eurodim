FROM node:24-slim AS build

RUN corepack enable && corepack prepare yarn@stable --activate

WORKDIR /app

COPY . .
RUN yarn install --immutable
RUN yarn build

FROM nginx:alpine

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/pwa /usr/share/nginx/html

EXPOSE 80
