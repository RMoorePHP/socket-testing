FROM nginx:alpine

ARG PHP_UPSTREAM_CONTAINER=php
ARG PHP_UPSTREAM_PORT=9000

RUN apk update \
    && apk add --no-cache bash \
    && adduser -D -H -u 1000 -s /bin/bash www-data

# Set upstream conf and remove the default conf
RUN echo "upstream php-upstream { server ${PHP_UPSTREAM_CONTAINER}:${PHP_UPSTREAM_PORT}; }" > /etc/nginx/conf.d/upstream.conf \
    && rm /etc/nginx/conf.d/default.conf

COPY ./docker/services/nginx/nginx.conf /etc/nginx/
COPY ./docker/services/nginx/vhost.conf /etc/nginx/conf.d/
COPY ./public /app/public

CMD ["nginx"]

EXPOSE 80 443