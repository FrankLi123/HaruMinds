from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
# from langchain.document_loaders import TextLoader
# from langchain.indexes import VectorstoreIndexCreator
# from langchain.chat_models import ChatOpenAI
import random
import openai
import os
from django.db import connection
# Create your views here.


user_data = [
    {'username': 'frank', 'password': '123'},
    {'username': 'jack', 'password': '456'},
]

def check_credentials(username, password):
    with connection.cursor() as cursor:
        query = "SELECT * FROM registration WHERE username = %s AND password = %s"
        cursor.execute(query, (username, password))
        res = cursor.fetchall()
        if len(res) > 0:
            return True
    return False




preference = None

def home_page_view(request):
    return HttpResponse("hello, world")


def generate_response_view(request):
    arr = [
        'Please take a break!',
        'Don\'t forget to stretch for a while',
        'You are awesome today!!!',
        'Do not think about the things that you cannot change',
        'There is a elder saying \"live in the moment\" '
    ]

    if preference == None:
        selected_sentence = random.choice(arr)
        return JsonResponse({'sentence': selected_sentence})
    
    else:
        openai.api_key= os.getenv("OPENAI_API_KEY")
        prompt= f'can you give me a {preference} quote?'

        model = "text-davinci-003"
        response = openai.Completion.create(engine=model, prompt=prompt, max_tokens =50)
        generated_text =response.choices[0].text

        print("answer is: " + generated_text)
        return JsonResponse({'sentence': generated_text})


# handler users setting inputs
def client_setting_view(request):
    global preference
    # response =  f"server received the input {param1} | {param2}"
    # Store it into the MySQL table

    param1 = request.GET.get('param1')
    print(f"received {param1}")
    query = f'{param1}'
    preference = param1

    return HttpResponse({'result': "ok"})


# handler log-in request
def login_view(request):
    global preference
    username = request.GET.get('username')
    password = request.GET.get('password')



    # print(f"received username: {param1}, password:{param2}")
    if check_credentials(username,password):
        response = JsonResponse({'success': True})
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        return response
    else:
        response = JsonResponse({'success': False})
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        return response
    

# handler for user registration
def register_view(request):
    username = request.GET.get('username')
    password = request.GET.get('password')
    email = request.GET.get('email')

    print("register_view:received" +  username + "  " + password + "  " + email)

    with connection.cursor() as cursor:

        cursor.execute("INSERT INTO registration (username, password, email) VALUES (%s, %s, %s)", (username, password,email))

    response = JsonResponse({'success': True})
    
    return response