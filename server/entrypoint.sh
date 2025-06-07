#!/bin/sh

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate --noinput

# Then exec the container's main process (what's set as CMD in the Dockerfile or docker-compose.yml)
exec "$@"
