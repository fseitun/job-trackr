FROM node:20-alpine

WORKDIR /usr/src/app

RUN corepack enable && corepack prepare yarn@4.5.0 --activate

COPY . .

RUN yarn install --immutable

RUN yarn workspace api build

EXPOSE 3000
CMD ["node", "app/api/dist/main.js"]