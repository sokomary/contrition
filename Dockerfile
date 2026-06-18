FROM node:20-bullseye-slim AS build

RUN apt-get update && apt-get install -y --no-install-recommends git \
    && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare pnpm@10.6.2 --activate

ARG GITHUB_AUTH_TOKEN
ENV GITHUB_AUTH_TOKEN=$GITHUB_AUTH_TOKEN

RUN mkdir /app
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN echo -e "@sokomary:registry=https://npm.pkg.github.com/\n//npm.pkg.github.com/:_authToken=$GITHUB_AUTH_TOKEN" > .npmrc

RUN pnpm install

COPY . .
RUN pnpm run build

FROM nginx:stable-alpine
COPY dockerConf/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3002

