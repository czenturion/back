FROM node:18

WORKDIR /dist

COPY . /dist

RUN yarn install

CMD ["yarn", "start"]