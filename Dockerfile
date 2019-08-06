FROM node:8 AS BBB
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY index.* webpack.config.js .babelrc ./
RUN yarn build

FROM nginx:alpine AS DDD
WORKDIR /app
COPY --from=BBB --chown=nginx:nginx /usr/src/app/dist /app/dist
COPY *.conf entrypoint.sh ./
EXPOSE 80

ENTRYPOINT [ "/bin/sh", "entrypoint.sh" ]