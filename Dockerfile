FROM alpine as build

RUN apk add --no-cache --update nodejs npm git

ARG GITHUB_AUTH_TOKEN
ENV GITHUB_AUTH_TOKEN=$GITHUB_AUTH_TOKEN

RUN mkdir /app
WORKDIR /app

COPY package.json package-lock.json ./

RUN echo -e "@sokomary:registry=https://npm.pkg.github.com/\n//npm.pkg.github.com/:_authToken=$GITHUB_AUTH_TOKEN" > .npmrc

RUN npm ci --include=dev

COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY dockerConf/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
COPY dockerConf/fullchain.pem /etc/nginx
COPY dockerConf/privkey.pem /etc/nginx
EXPOSE 2443

