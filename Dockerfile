FROM nginx
COPY dockerConf/nginx.conf /etc/nginx/nginx.conf
COPY build /usr/share/nginx/html
COPY dockerConf/fullchain.pem /etc/nginx
COPY dockerConf/privkey.pem /etc/nginx