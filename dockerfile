# Install dependencies only when needed
FROM node:16.13.1-alpine AS depends
# RUN apk add --no-cache libc6-compa

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:16.13.1-alpine AS builder
WORKDIR /app

COPY . .
COPY --from=depends /app/node_modules ./node_modules
RUN npx prisma generate && yarn build && yarn install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run
FROM node:16.13.1-alpine AS runner
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextnest -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/schema.prisma ./schema.prisma
COPY --from=builder --chown=nextnest:nodejs /app/.next ./.next
COPY --from=builder --chown=nextnest:nodejs /app/.nest ./.nest
COPY --from=builder --chown=nextnest:nodejs /app/server.schema.graphql ./server.schema.graphql
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextnest