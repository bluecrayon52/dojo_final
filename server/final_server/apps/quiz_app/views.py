from django.shortcuts import HttpResponse
from .models import Quiz, Question, Answer, Score
from django.core import serializers
from django.forms.models import model_to_dict
from datetime import datetime
import json
import bcrypt



def get_all(request):
    if request.method == "GET":
        user_id = json.loads(request.body.decode())['user_id']
        quiz_list = []
        quizzes = Quiz.objects.all()
        for quiz in quizzes:
            quiz_dict = { 
                "name": quiz.name,
                "created_by": {
                    "id": quiz.created_by.id,
                    "first_name": quiz.created_by.first_name,
                    "last_name": quiz.created_by.last_name
                },
                "questions": [],
                "score": -1
            }
            score = Score.objects.filter(quiz=quiz.id, user=user_id)
            if score: 
                quiz_dict["score"] = score[0].value

            questions = quiz.questions.all()
            for question in questions:
                question_dict = {
                    "text": question.text,
                    "answers": []
                }
                answers = question.answers.all()
                for answer in answers:
                    answer_dict = {
                        "text": answer.text,
                        "correct": answer.correct
                    }
                    question_dict["answers"].append(answer_dict)
                quiz_dict[ "questions"].append(question_dict) 
            quiz_list.append(quiz_dict)
        # print(quiz_list)   
        serialized_quizzes = json.dumps(quiz_list)
        return HttpResponse(serialized_quizzes, content_type="application/json", status=200)

def get_one(request):
    if request.method == "GET":
        pass

def create(request):
    if request.method == "POST":
        pass

def add_question(request):
    if request.method == "POST":
        pass 

def save_score(request):
    if request.method == "POST":
        pass

def delete_quiz(request):
    if request.method == "DELETE":
        pass

 