FROM node:alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

# Copier le reste du code source
COPY . .

# EXPOSE 5173

# CMD ["yarn", "dev"]

RUN yarn build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
