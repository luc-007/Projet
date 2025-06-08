FROM python:3.11-slim

WORKDIR /app

# Installer les dépendances système
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc libpq-dev && \
    pip install --upgrade pip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create a non-root user and group
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

# Copier les dépendances Python
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copier le code source
COPY . .

# Change ownership of the app directory
RUN chown -R appuser:appgroup /app

# Collect static files
RUN python manage.py collectstatic --noinput --clear 

# Copy entrypoint script and make it executable
COPY entrypoint.sh .
RUN chmod +x /app/entrypoint.sh

# Switch to non-root user
USER appuser

EXPOSE 8000

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "server_config.wsgi:application"]
# Remains as the command passed to entrypoint
