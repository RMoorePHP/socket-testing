FROM php:7.1-alpine

RUN docker-php-ext-install pdo_mysql

WORKDIR /app

ADD crontab /etc/cron.d/docker-cron

RUN chmod 0644 /etc/cron.d/docker-cron

RUN touch /var/log/cron.log

CMD cron && tail -f /var/log/cron.log