# 1️⃣ Install dependencies only when needed
FROM node:22-alpine AS deps
WORKDIR /app

# Copy only package files for caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# 2️⃣ Build the source code
FROM node:22-alpine AS builder
WORKDIR /app

# Copy installed node_modules
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js app
RUN npm run build

# 3️⃣ Production image
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only necessary files for runtime
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8080

# Start Next.js in production
CMD ["npm", "start"]
