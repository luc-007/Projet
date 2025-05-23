from django.contrib import admin
from django.urls import path, include # Importez include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('articles.urls')), # Incluez les URLs de l'application articles sous le préfixe /api/
]