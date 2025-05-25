from django.db import models

class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    stock = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    # Pour les images, on va stocker les URLs en JSON (liste)
    images = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.title
