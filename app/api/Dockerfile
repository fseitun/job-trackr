# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /usr/src/app
RUN corepack enable && corepack prepare yarn@4.5.0 --activate
COPY . .
RUN yarn install --immutable
RUN yarn workspace api build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/yarn.lock ./yarn.lock
RUN yarn install --production --immutable
EXPOSE 3000
CMD ["node", "dist/main.js"]
