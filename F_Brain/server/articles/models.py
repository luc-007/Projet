from django.db import models

class Article(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    stock = models.IntegerField(default=0)
    # Champ pour stocker les URLs des images (peut être un JSONField ou un champ texte)
    # Pour commencer simplement, utilisons un champ texte qui stockera une liste d'URLs séparées par des virgules
    # Une meilleure approche serait un modèle Image séparé lié à l'Article
    images = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

    # Méthode pour obtenir les URLs d'images sous forme de liste
    def get_image_urls(self):
        if self.images:
            return [url.strip() for url in self.images.split(',') if url.strip()]
        return []