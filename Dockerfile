FROM node:18

WORKDIR /src

COPY . /src

RUN yarn install

CMD ["yarn", "start"]