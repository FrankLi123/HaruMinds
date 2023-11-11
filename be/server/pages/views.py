from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
# from langchain.document_loaders import TextLoader
# from langchain.indexes import VectorstoreIndexCreator
# from langchain.chat_models import ChatOpenAI
import random
import openai
import os
import datetime
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
        res = cursor.fetchone()
       
        print(res)
        if res:
            user_id, user_name, email, password, created_at, updated_at = res
            return True, user_id, user_name
            
    return False, None, None


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
    success, user_id, user_name = check_credentials(username,password)

    if success:

        response_data ={
            'success' :True,
            'user_id' : user_id,
            'user_name' : user_name
        }
      
    else:
        response_data = {
            'success': False
        }

    response = JsonResponse(response_data)
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


# handler for user data collected from the use
def collected_data_view(request):
    print("debugg!!!")
    yesCount = request.GET.get('yesCount')
    noCount = request.GET.get('noCount')
    timeSpent = request.GET.get('timeSpent')
    userId = request.GET.get('userId')
    date = datetime.date.today()
    dateStr =date.strftime('%Y-%m-%d')
    print("register_view:received yesCount: " +  yesCount + "  , noCount: " + noCount + "  ,timeSpent: " + timeSpent + " ,userId: " + userId + " , date is : " + dateStr)

    with connection.cursor() as cursor:

        #Check if there is an existing row for the user on this date
        cursor.execute("SELECT * FROM distractionAnswer WHERE user_id = %s AND date = %s", (userId, date))

        if cursor.fetchone():
            cursor.execute("UPDATE distractionAnswer SET yes_count = yes_count + %s, no_count = no_count + %s, time_spent = time_spent + %s WHERE user_id = %s AND date = %s", (yesCount, noCount, timeSpent, userId, date))
        else:
            cursor.execute("INSERT INTO distractionAnswer (user_id, date, yes_count, no_count, time_spent) VALUES (%s, %s, %s, %s, %s)", (userId, date, yesCount, noCount,timeSpent))

    response = JsonResponse({'success': True})
    return response


def retrieve_data_view(request):

    userId = request.GET.get('userId')

    with connection.cursor() as cursor:

        #Check if there is an existing row for the user on this date
        cursor.execute("SELECT date, yes_count FROM distractionAnswer WHERE user_id = %s ORDER BY date ASC", (userId,))

        data = cursor.fetchall()

        dates = [row[0] for row in data]
        yes_counts = [row[1] for row in data]

        for date, yes_count in zip(dates, yes_counts):
            print(f"Date: {date}, Yes Count: {yes_count}")

        res_data = {
            'dates' : dates,
            'yesCounts': yes_counts
        }

        return JsonResponse(res_data)