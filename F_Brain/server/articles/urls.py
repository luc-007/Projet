from django.urls import path
from .views import ArticleListCreateView, ArticleRetrieveUpdateDestroyView

urlpatterns = [
    path('articles/', ArticleListCreateView.as_view(), name='article-list-create'),
    path('articles/<int:id>/', ArticleRetrieveUpdateDestroyView.as_view(), name='article-detail'),
]