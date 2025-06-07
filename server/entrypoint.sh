#!/bin/sh

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate --noinput

# Debugging information
echo "--- DEBUG INFO ---"
echo "Running as user: $(whoami)"
echo "Working directory: $(pwd)"
echo "Python version: $(python --version)"
echo "Gunicorn path: $(which gunicorn)"
echo "PYTHONPATH: $PYTHONPATH"
echo "Arguments received (CMD): $@"
echo "--- END DEBUG INFO ---"

# Then exec the container's main process (what's set as CMD in the Dockerfile or docker-compose.yml)
exec "$@"
