FROM php:7.1-fpm-alpine

RUN docker-php-ext-install pdo_mysql pcntl

RUN echo http://dl-2.alpinelinux.org/alpine/edge/community/ >> /etc/apk/repositories

RUN apk update \
    && apk add --no-cache bash \
    && apk add --no-cache shadow \
    && usermod -u 1000 www-data

RUN curl -s http://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer

COPY ./ /app
WORKDIR /app


RUN composer install --no-progress --no-suggest