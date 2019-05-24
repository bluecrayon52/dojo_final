from django.urls import path
from . import views

urlpatterns = [
    path('get_all/<user_id>', views.get_all),
    path('get_one/<quiz_id>/<user_id>', views.get_one),
    path('create/', views.create),
    path('add_question/', views.add_question),
    path('delete_question/<question_id>/<user_id>', views.delete_question),
    path('delete_quiz/<quiz_id>/<user_id>', views.delete_quiz),
    path('save_score/', views.save_score), 
]
