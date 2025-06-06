FROM python:3.11-slim

WORKDIR /app

# Installer les dépendances système
RUN apt-get update && \
    apt-get install -y gcc libpq-dev && \
    pip install --upgrade pip

# Copier les dépendances Python
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copier le code source
COPY . .

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "server_config.wsgi:application"]