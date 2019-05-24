from django.shortcuts import HttpResponse
from .models import Quiz, Question, Answer, Score
from apps.login_reg_app.models import User
from django.core import serializers
from django.forms.models import model_to_dict
from datetime import datetime
import json
import bcrypt

# helper function to build quiz objects from django model 
def build_quiz_dict(quiz, user_id):
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
    # try to get the latest score
    score = Score.objects.filter(quiz=quiz.id, user=user_id)
    if score: 
        quiz_dict["score"] = score[0].value

    # build the question objects 
    questions = quiz.questions.all()
    for question in questions:
        question_dict = {
            "text": question.text,
            "answers": []
        }
        # build the answer objects 
        answers = question.answers.all()
        for answer in answers:
            answer_dict = {
                "text": answer.text,
                "correct": answer.correct
            }
            # stuff the answer objects into the question objects 
            question_dict["answers"].append(answer_dict)
        # stuff the question objects into the quiz objects 
        quiz_dict[ "questions"].append(question_dict) 
    return(quiz_dict)    


# get all of the quizzes in the DB, 
# and if the current user has taken them, populate their latest score, 
# else mark score as -1 to indicate current user has saved any scores for that quiz
def get_all(request):
    if request.method == "GET":
        # decode the byte string request body to unicode
        # and deserialize to a python object (dictionary)
        user_id = json.loads(request.body.decode())['user_id']
        quiz_list = []
        # build the quiz objects
        quizzes = Quiz.objects.all()
        for quiz in quizzes:
            quiz_list.append(build_quiz_dict(quiz, user_id))
        # print(quiz_list)   
        # turn python object into JSON 
        serialized_quizzes = json.dumps(quiz_list)
        return HttpResponse(serialized_quizzes, content_type="application/json", status=200)

# get one quiz by quiz_id or return error message for no quiz found
def get_one(request):
    if request.method == "GET":
        req = json.loads(request.body.decode())
        quiz_id = req["quiz_id"]
        user_id = req["user_id"]
        try:
            quiz = Quiz.objects.get(id=quiz_id)
        except:
            serialized_errors = json.dumps({"message": f"no quiz with id: {quiz_id} found"})
            return HttpResponse(serialized_errors, content_type="application/json", status=400)
        else:
            # turn python object into JSON 
            serialized_quiz = json.dumps(build_quiz_dict(quiz, user_id))
            return HttpResponse(serialized_quiz, content_type="application/json", status=200)

# create a new quiz, initialize with name and created_by only 
# return new quiz id and name
def create(request):
    if request.method == "POST":
        quiz_dict = json.loads(request.body.decode())
        user_id = quiz_dict["user_id"]
        try: 
            user = User.objects.get(id=user_id)
        except:
            serialized_errors = json.dumps({"message": f"no user with id: {user_id} found"})
            return HttpResponse(serialized_errors, content_type="application/json", status=400)
        else: 
            new_quiz = Quiz.objects.create(
                name=quiz_dict["name"],
                created_by=user
            )
            dict_obj = model_to_dict(new_quiz, fields=['id','name'])
            serialized_quiz = json.dumps(dict_obj)
            return HttpResponse(serialized_quiz, content_type="application/json", status=200)

# add a question and answers to an existing quiz 
# return the new question and answers
def add_question(request):
    if request.method == "POST":
        print(request.body.decode())
        question_dict = json.loads(request.body.decode())
        quiz_id = question_dict["quiz_id"]
        text = question_dict["text"]
        answers = question_dict["answers"]
        try: 
            quiz = Quiz.objects.get(id=quiz_id)
        except:
            serialized_errors = json.dumps({"message": f"no quiz with id: {quiz_id} found"})
            return HttpResponse(serialized_errors, content_type="application/json", status=400)
        else: 
            new_question = Question.objects.create(
                quiz=quiz,
                text=text,
            )
            answer_list =[]
            for answer in answers:
                new_answer = Answer.objects.create(
                    question=new_question,
                    text=answer["text"],
                    correct=answer["correct"]
                )

                answer_dict = {
                "text": new_answer.text,
                "correct": new_answer.correct
                }
                answer_list.append(answer_dict)

            question_dict = {
            "text": new_question.text,
            "answers": answer_list
            }
            serialized_question = json.dumps(question_dict)
            return HttpResponse(serialized_question, content_type="application/json", status=200)

def save_score(request):
    if request.method == "POST":
        pass

def delete_quiz(request):
    if request.method == "DELETE":
        pass

 