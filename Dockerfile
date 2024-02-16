# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
#FROM node as build-stage
#WORKDIR /app
#COPY package*.json /app/
#RUN npm config set registry https://registry.npmjs.org/
#RUN npm config set @sokomary:registry https://npm.pkg.github.com/
#RUN npm install
#COPY ./ /app/
#RUN npm run build
## Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
#FROM nginx:1.15
#COPY dockerConf/fullchain.pem /etc/nginx
#COPY dockerConf/privkey.pem /etc/nginx
#COPY --from=build-stage /app/build/ /usr/share/nginx/html
#COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf

FROM nginx
COPY dockerConf/nginx.conf /etc/nginx/nginx.conf
COPY build /usr/share/nginx/html
COPY dockerConf/fullchain.pem /etc/nginx
COPY dockerConf/privkey.pem /etc/nginx