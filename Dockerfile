# ---------------------
# Stage 1: Dependencies
# ---------------------
FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install; \
  elif [ -f yarn.lock ]; then yarn install; \
  else npm install; fi

# ---------------------
# Stage 2: Builder
# ---------------------
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build   # Builds Next.js app

# ---------------------
# Stage 3: Production
# ---------------------
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

RUN \
  if [ -f package-lock.json ]; then npm ci --omit=dev; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install --prod; \
  elif [ -f yarn.lock ]; then yarn install --production; \
  else npm install --omit=dev; fi

EXPOSE 8080
CMD ["npm", "start"]

# ---------------------
# Stage 4: Development
# ---------------------
FROM node:22-alpine AS dev
WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm install

COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
