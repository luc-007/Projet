# Étape 1 : build de l'app React (prod)
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Étape 2 : serveur Nginx pour servir la build (prod)
FROM nginx:stable-alpine as production

COPY --from=build /app/dist /usr/share/nginx/html

# Expose le port 4173 pour prod
EXPOSE 4173

CMD ["nginx", "-g", "daemon off;"]

# Étape 3 : image pour dev avec Vite en mode dev (port 5173)
FROM node:18-alpine as development

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
