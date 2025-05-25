# Utiliser l'image officielle de Nginx
FROM nginx:latest

# Copier le fichier de configuration personnalisé
COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port HTTP (80)
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
