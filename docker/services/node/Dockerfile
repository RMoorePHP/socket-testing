FROM node:carbon

WORKDIR /app

COPY ./node/package*.json ./

RUN yarn

COPY ./node .

EXPOSE 3000

CMD [ "yarn", "live" ]
