from django.shortcuts import HttpResponse
from .models import User
from django.core import serializers
from django.forms.models import model_to_dict
from datetime import datetime
import json
import bcrypt

def register(request):
    if request.method == "POST":
        # deserialize JSON string to a python object (dictionary)
        # after decoding the byte string to unicode
        reg_dict = json.loads(request.body.decode())
        errors = User.objects.register_validator(reg_dict)
        if len(errors) > 0:
            # serialize python object (dictionary) to a JSON string
            serialized_errors = json.dumps(errors)
            return HttpResponse(serialized_errors, content_type="application/json", status=400)
        else:
            new_user = User.objects.create(
                first_name=reg_dict['first_name'],
                last_name=reg_dict['last_name'],
                birthday=reg_dict['birthday'],
                email=reg_dict['email'],
                password= bcrypt.hashpw(reg_dict['password'].encode(), bcrypt.gensalt()).decode()
            )
            # convert django model to a python object (dictionary), specifying fields to capture (password omitted)
            dict_obj = model_to_dict(new_user, fields=['id','first_name', 'last_name', 'birthday', 'email'])
            # serialize python object (dictionary) to a JSON string
            serialized_user = json.dumps(dict_obj)
            return HttpResponse(serialized_user, content_type="application/json", status=200)
    

def login(request):
    if request.method == "POST":
        # deserialize JSON string to a python object (dictionary)
        # after decoding the byte string to unicode
        login_dict = json.loads(request.body.decode())
        errors = User.objects.login_validator(login_dict)
        if len(errors) > 0:
            # serialize python object (dictionary) to a JSON string
            serialized_errors = json.dumps(errors)
            return HttpResponse(serialized_errors, content_type="application/json", status=400)
        else:
            user = User.objects.get(email=login_dict['email'])
            # convert datetime object to string 
            user.birthday = datetime.strftime(user.birthday, '%Y-%m-%d')
            # convert django model to a python object (dictionary), specifying fields to capture (password omitted)
            dict_obj = model_to_dict(user, fields=['id','first_name', 'last_name', 'birthday', 'email'])
            # serialize python object (dictionary) to a JSON string
            serialized_user = json.dumps(dict_obj)
            return HttpResponse(serialized_user, content_type="application/json", status=200)