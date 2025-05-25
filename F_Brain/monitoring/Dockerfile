# Utiliser les images officielles pour Prometheus et Grafana
FROM prom/prometheus:v2.33.0

# Copier la configuration Prometheus (prometheus.yml) dans l'image Docker
COPY prometheus.yml /etc/prometheus/prometheus.yml

# Exposer les ports nécessaires pour Prometheus et Grafana
EXPOSE 9090
EXPOSE 3000

# Démarrer Prometheus
CMD ["prometheus", "--config.file=/etc/prometheus/prometheus.yml"]
