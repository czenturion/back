FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY tsconfig.json ./
COPY src ./src

RUN yarn tsc --noEmit && yarn build

COPY dist ./dist
COPY src/pages ./dist/pages

EXPOSE 5000

CMD ["yarn", "start"]