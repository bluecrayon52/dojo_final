from __future__ import unicode_literals
from django.db import models
from apps.login_reg_app.models import User
from datetime import datetime
import bcrypt
from dateutil.relativedelta import relativedelta
import re

class Quiz(models.Model):
    name = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, related_name="quizzes", on_delete=models.CASCADE)
    # questions implicit field
    # scores implicit field

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, related_name="questions", on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    # answers implicit field

class Answer(models.Model):
    question = models.ForeignKey(Question, related_name="answers", on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    correct = models.BooleanField(default=False)

class Score(models.Model):
    value = models.IntegerField()
    user = models.ForeignKey(User, related_name="scores", on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, related_name="scores", on_delete=models.CASCADE)


    