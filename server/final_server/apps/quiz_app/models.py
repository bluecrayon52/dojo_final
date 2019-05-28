from __future__ import unicode_literals
from django.db import models
from apps.login_reg_app.models import User
from datetime import datetime
import bcrypt
from dateutil.relativedelta import relativedelta
import re

#TODO add validation for quiz creation
class QuizManager(models.Manager):
    def quiz_validator(self, quiz_data):
        errors = {}
        user_id = quiz_data["user_id"]
        try: 
            user = User.objects.get(id=user_id)
        except:
            errors["user_id"] = f"No user with id: {user_id} found"
        if len(quiz_data["name"]) < 5:
            errors["name"] = "Quiz name must be at least 5 characters"
        return errors

# TODO add validation for question creation
class QuestionManager(models.Manager):
    def question_validator(self, question_data):
        errors = {}
        quiz_id = question_data["quiz_id"]
        try: 
            quiz = Quiz.objects.get(id=quiz_id)
        except:
            errors["quiz_id"] = f"no quiz with id: {quiz_id} found"
        else: 
            user_id = question_data["user_id"]
            if quiz.created_by.id != user_id:
                errors["user_id"] = f"user with id: {user_id} is not authorized to edit quiz with id: {quiz_id}"
        # check for at least on correct answer
        answers = question_data["answers"]
        incorrect = 0
        for answer in answers:
            if (not answer["correct"]):
                incorrect += 1
        if incorrect == len(answers):
            errors["correct"] = "at least one answer must be marked as correct"

        if len(question_data["text"]) == 0:
            errors["question_text"] = "question text is required"
        elif len(question_data["text"]) < 5:
            errors["question_text"] = "question text must be at least 5 characters"
        return errors

class Quiz(models.Model):
    name = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, related_name="quizzes", on_delete=models.CASCADE)
    objects = QuizManager()
    # questions implicit field
    # scores implicit field

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, related_name="questions", on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    objects = QuestionManager()
    # answers implicit field

class Answer(models.Model):
    question = models.ForeignKey(Question, related_name="answers", on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    correct = models.BooleanField(default=False)

class Score(models.Model):
    value = models.IntegerField()
    user = models.ForeignKey(User, related_name="scores", on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, related_name="scores", on_delete=models.CASCADE)


    