# Étape 1: Build de l'application React
FROM node:lts-alpine as builder

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json (ou yarn.lock)
# pour installer les dépendances. Cette étape est mise en cache si les fichiers ne changent pas.
COPY package*.json ./

# Installe les dépendances du projet
RUN npm install

# Copie le reste du code source de l'application (y compris src/, public/, etc.)
COPY . .

# Construit l'application pour la production.
# Le résultat (fichiers statiques) sera placé dans le dossier 'build' par défaut.
RUN npm run build

# Étape 2: Servir l'application statique avec Nginx
FROM nginx:alpine

# Copie les fichiers construits depuis l'étape de build (nommée 'builder')
# vers le répertoire de service par défaut de Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Expose le port 80 pour l'accès à l'application
EXPOSE 80

# Commande par défaut pour démarrer Nginx en mode foreground
CMD ["nginx", "-g", "daemon off;"]