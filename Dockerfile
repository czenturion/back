FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production

COPY tsconfig.json ./
COPY src ./src

RUN yarn tsc --noEmit && yarn build

COPY dist ./dist

EXPOSE 5000

CMD ["yarn", "start"]