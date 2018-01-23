FROM phusion/baseimage:latest

RUN DEBIAN_FRONTEND=noninteractive

RUN locale-gen en_US.UTF-8

ENV LANGUAGE=en_US.UTF-8
ENV LC_ALL=en_US.UTF-8
ENV LC_CTYPE=en_US.UTF-8
ENV LANG=en_US.UTF-8
ENV TERM xterm

RUN apt-get update -y

RUN apt-get install -y software-properties-common
RUN add-apt-repository -y ppa:ondrej/php

RUN apt-get update -y

RUN apt-get install -y \
                openssl \
                zip \
                unzip \
                git \
                nano \
                php7.1-cli \
                php7.1-dom \
                php7.1-mysql \
                php7.1-mbstring

RUN curl -s http://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer

WORKDIR /app

RUN mkdir /var/www && chmod -R 777 /var/www

RUN usermod -u 1000 www-data
