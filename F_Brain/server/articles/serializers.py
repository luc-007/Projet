from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    # Champ pour les images, utilisant la méthode get_image_urls du modèle
    # read_only=True car nous ne permettons pas l'écriture directe des URLs via ce serializer
    images = serializers.ListField(child=serializers.URLField(), read_only=True)

    class Meta:
        model = Article
        fields = ['id', 'name', 'price', 'description', 'stock', 'images']
        # Ajoutez 'images' aux champs pour qu'il soit inclus dans la sortie API
        # Si vous voulez permettre l'écriture d'URLs d'images via l'API,
        # vous devrez adapter le serializer et la vue.