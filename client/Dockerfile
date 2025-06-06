FROM node:alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

# Copier le reste du code source
COPY . .

EXPOSE 5173

CMD ["yarn", "dev"]
