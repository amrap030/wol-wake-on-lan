# Common build stage
FROM node:16-alpine as builder

COPY . ./app

WORKDIR /app

RUN yarn install
RUN yarn build

FROM node:16-alpine

ENV NODE_ENV production

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/packages/frontend/dist ./dist/frontend
COPY --from=builder /app/packages/backend/dist ./dist/backend

CMD ["node", "dist/backend/app.js"]
