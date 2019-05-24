from django.urls import path
from . import views

urlpatterns = [
    path('get_all/', views.get_all),
    path('get_one/', views.get_one),
    path('create/', views.create),
    path('add_question/', views.add_question),
    path('delete_quiz/', views.delete_quiz),
    path('save_score/', views.save_score), 
]
