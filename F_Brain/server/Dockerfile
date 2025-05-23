# Utilise une image Python comme base
# Optionnel: Vous pouvez aussi utiliser python:3.12-alpine
FROM python:3.11-alpine

# Définit les variables d'environnement pour Python (utile pour les logs)
ENV PYTHONUNBUFFERED 1

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers de dépendances
COPY requirements.txt /app/

# Installe les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Copie le reste du code source de l'application Django
COPY . /app/

# Expose le port sur lequel l'application Django s'exécutera (par défaut 8000)
EXPOSE 8000

# Commande par défaut pour démarrer le serveur de développement Django
# Pour la production, vous utiliseriez un serveur WSGI comme Gunicorn
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]