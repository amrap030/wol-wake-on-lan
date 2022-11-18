FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

COPY . .

RUN yarn install --network-timeout 1000000

RUN yarn build

FROM node:16-alpine AS final

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder ./app/package.json ./package.json
COPY --from=builder ./app/yarn.lock ./yarn.lock
COPY --from=builder ./app/packages/backend/dist ./packages/backend/dist
COPY --from=builder ./app/packages/backend/package*.json ./packages/backend/
COPY --from=builder ./app/packages/frontend/dist ./packages/frontend/dist
COPY --from=builder ./app/packages/frontend/package*.json ./packages/frontend/

RUN yarn install --production --network-timeout 1000000

CMD ["yarn","start:prod"]