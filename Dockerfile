FROM node:18

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn tsc --noEmit && yarn build

RUN mkdir -p dist/pages
COPY src/pages ./dist/pages

EXPOSE 5000

CMD ["yarn", "start"]