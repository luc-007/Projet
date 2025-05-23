FROM nginx:alpine

# Copie le fichier de configuration Nginx personnalisé
COPY nginx.conf /etc/nginx/nginx.conf

# Expose le port 80 pour l'accès externe
EXPOSE 80

# Commande par défaut pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]