from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
# from langchain.document_loaders import TextLoader
# from langchain.indexes import VectorstoreIndexCreator
# from langchain.chat_models import ChatOpenAI
import random
from openai import OpenAI
import os
import datetime
from django.db import connection
# Create your views here.
import json
from pages.utils.openai_api import generate_long_term_plan_view
from pages.utils.openai_api import generate_daily_plan_view
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
    with connection.cursor() as cursor:
        query = "SELECT content FROM words ORDER BY RAND() LIMIT 1"
        cursor.execute(query)
        random_word = cursor.fetchone()

    if random_word:
        return JsonResponse({'sentence': random_word[0]})
    else:
        return JsonResponse({'sentence': 'No words found in the database'})

    # arr = [
    #     'Please take a break!',
    # ]

    # if preference == None:
    #     selected_sentence = random.choice(arr)
    #     return JsonResponse({'sentence': selected_sentence})
    
    # else:
    #     openai.api_key= os.getenv("OPENAI_API_KEY")
    #     prompt= f'can you give me a {preference} quote?'

    #     model = "text-davinci-003"
    #     response = openai.Completion.create(engine=model, prompt=prompt, max_tokens =50)
    #     generated_text =response.choices[0].text

    #     print("answer is: " + generated_text)
    #     return JsonResponse({'sentence': generated_text})



def generate_ai_response_view(request):

        param1 = request.GET.get('text')
        print(f"received {param1}")

        # openai.api_key= os.getenv("OPENAI_API_KEY")

        prompt= [
                {"role": "system", "content": "You are a professional psychological therapist that help patients."},
                {"role": "user", "content": 
        f'(please respond to a guy who is suffering from mental issue as an therapist within 70 token please): Here is the text:{param1}'
         },
        ]
        # prompt= '{param1}'
        # model = "text-davinci-003"
        # response = openai.Completion.create(engine=model, prompt=prompt, max_tokens =70)
        # generated_text =response.choices[0].text

        client = OpenAI()
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=prompt
        )

        generated_text = completion.choices[0].message.content
        print("answer is: " + generated_text)
        return JsonResponse({'sentence': generated_text})
        # return JsonResponse({'sentence': "hey what's up man!"})





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
    yesDistractCount = request.GET.get('distractYesCount')
    noDistractCount = request.GET.get('distractNoCount')
    
    yesTipCount = request.GET.get('tipYesCount')
    noTipCount = request.GET.get('tipNoCount')

    timeSpent = request.GET.get('timeSpent')

    userId = request.GET.get('userId')
    
    date = datetime.date.today()
    
    dateStr =date.strftime('%Y-%m-%d')
    
    print("register_view:received yesDistractCount: " +  yesDistractCount + "  , noDistractCount: " + noDistractCount +"  , yesTipCount: " + yesTipCount +"  , noTipCount: " + noTipCount + "  ,timeSpent: " + timeSpent + " ,userId: " + userId + " , date is : " + dateStr)

    with connection.cursor() as cursor:
        #Check if there is an existing row for the user on this date
        cursor.execute("SELECT * FROM distractionAnswer WHERE user_id = %s AND date = %s", (userId, date))
        if cursor.fetchone():
            cursor.execute("UPDATE distractionAnswer SET distract_yes_count = distract_yes_count + %s, distract_no_count = distract_no_count + %s, tip_yes_count = tip_yes_count + %s, tip_no_count = tip_no_count + %s, time_spent = time_spent + %s WHERE user_id = %s AND date = %s", (yesDistractCount, noDistractCount, yesTipCount, noTipCount, timeSpent, userId, date))
        else:
            cursor.execute("INSERT INTO distractionAnswer (user_id, date, distract_yes_count, distract_no_count,tip_yes_count, tip_no_count, time_spent) VALUES (%s, %s, %s, %s, %s, %s, %s)", (userId, date, yesDistractCount, noDistractCount, yesTipCount, noTipCount,timeSpent))

    response = JsonResponse({'success': True})
    return response



def remove_quotes_and_backslashes(input_string):
    # Remove leading and trailing double quotes
    result_string = input_string.strip('"')
    # Remove backslashes
    result_string = result_string.replace('\\', '')
    return result_string



def user_daily_plan_view(request):
    userId = request.GET.get('userId')

    with connection.cursor() as cursor:
        # Check if there is an existing row for the user
        cursor.execute("SELECT long_term_plan, phase_number FROM user WHERE id = %s", (userId,))
        row = cursor.fetchone()
        if row:
            long_term_plan = row[0].split(',') if row[0] else []
            phase_number = row[1]
            print(long_term_plan)
            print(phase_number)
        
    # Assuming phase_number is an integer, you can check its value and extract practical tips accordingly
    if phase_number == 0:
        # Extract practical tips for phase 0
        practical_tips = parse_tips_for_phase(long_term_plan, 1)

    print("practical_tips is: ")
    print(practical_tips)
    # Add more conditions for other phase numbers as needed

    # Now practical_tips contains the relevant practical tips for the selected phase
    # daily_plan = "to be continued"
    daily_plan = generate_daily_plan_view(practical_tips)
    
    print("message will be", daily_plan)

    return JsonResponse({'message': daily_plan})



def parse_tips_for_phase(long_term_plan, phase_number):
    # Join the list of strings into one
    long_term_plan_text = ' '.join(long_term_plan)
    # Assuming practical tips are separated by '\n\nTips for Phase x:' in long_term_plan_text
    tips_separator = f'\n\nTips for Phase {phase_number}:\n'
    next_phase_separator = f'\n\nPhase {phase_number + 1}'

    if tips_separator in long_term_plan_text:
        _, tips_section = long_term_plan_text.split(tips_separator, 1)
        tips = tips_section.split(next_phase_separator, 1)[0].strip()  # Stop at the next "Phase" heading
        return tips
    else:
        return f"Tips not found for Phase {phase_number}."




def user_initial_setting_view(request):
    userId = request.GET.get('userId')
    old_answer_string =  request.GET.get('answers')

    # answer_string = '{"selectedReasons":[],"confidence":"2"}'
    answer_string = remove_quotes_and_backslashes(old_answer_string)
    print("userId", userId)
    print("answer_string: "+ answer_string)
    answers_dict = json.loads(answer_string)
    print(type(answers_dict))


    # Print debugging information
    print("Decoded answers:", answers_dict)
    long_term_plan = generate_long_term_plan_view(answers_dict)
    # long_term_plan ="12312412"
    print("The generated long-term plan is:", long_term_plan)
    tableName = "user"

    with connection.cursor() as cursor:
        # Fetch the user instance from the database using the user_id
        cursor.execute("SELECT * FROM user WHERE id = %s", [userId])
        user_data = cursor.fetchone()
        if user_data:
            # Update the existing user's data
            update_query = f"UPDATE {tableName} SET answer_string = %s, long_term_plan = %s, phase_number = %s WHERE id = %s"
            cursor.execute(update_query, [answer_string, long_term_plan, 0, userId])
            # Return a JSON response indicating success
        else:
            # Insert a new user with the provided data
            insert_query = f"INSERT INTO {tableName} (id, long_term_plan, phase_number, answer_string) VALUES (%s, %s, %s,  %s)"
            cursor.execute(insert_query, [userId, long_term_plan, 0, answer_string])
            
    print("message will be", long_term_plan)
    return JsonResponse({'message': long_term_plan})
            


def retreive_long_term_plan_view(request):

    userId = request.GET.get('userId')
    print("retreive_long_term_plan_view, userId is", userId)
    with connection.cursor() as cursor:
            # Check if there is an existing row for the user
            cursor.execute("SELECT long_term_plan FROM user WHERE id = %s", (userId,))
            row = cursor.fetchone()
            if row:
                long_term_plan = row[0] if row[0] else []
    
    print("message plan will be", long_term_plan)

    return JsonResponse({'plan': long_term_plan})



def retreive_reasons_view(request):

    with connection.cursor() as cursor:
            # Retrieve all reasons and tips from your table
            cursor.execute("SELECT reason, tips FROM reasons")
            data = cursor.fetchall()

            # Extract reasons and tips from the result
            reasons = [row[0] for row in data]
            tips = [row[1] for row in data]

            # For demonstration purposes, print the retrieved data
            
            for reason, tip in zip(reasons, tips):
                print(f"Reason: {reason}, Tip: {tip}")
            
            # Prepare the response data
            response_data = {
                'reasons': reasons,
                'tips': tips,
            }

    return JsonResponse(response_data)




def retrieve_data_view(request):
    userId = request.GET.get('userId')
    with connection.cursor() as cursor:

        #Check if there is an existing row for the user on this date
        cursor.execute("SELECT date, distract_yes_count FROM distractionAnswer WHERE user_id = %s ORDER BY date ASC", (userId,))

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
    


def retreive_user_data_view(request):
    user_id = request.GET.get('userId')

    with connection.cursor() as cursor:
        # Check if there is an existing row for the user
        # cursor.execute("SELECT reasons, tips FROM user WHERE id = %s", (user_id,))
        # row = cursor.fetchone()

        # if row:
        #     reasons = row[0].split(',') if row[0] else []
        #     tips = row[1].split(',') if row[1] else []
        #     res_data = {'reasons': reasons, 'tips': tips}
        # else:
        res_data = {'reasons': [], 'tips': []}

    return JsonResponse(res_data)

def store_generated_texts_view(request):
    
    type = request.GET.get('type')

    if type == "texts":

        text_path = './data/words.txt'
        file_path = os.path.join(os.path.dirname(__file__), text_path)
        with open(file_path, 'r') as file:
        
            lines = file.readlines()

        category = lines[0].strip()
        group = lines[1].strip()
        generated_words = [word.strip() for word in lines[2:]]

        with connection.cursor() as cursor:
            for word in generated_words:
                    insert_query = """
                        INSERT INTO words ( content, category, `group`)
                        VALUES (%s, %s, %s)
                    """
                    values = ( word, category, group)
                    cursor.execute(insert_query, values)
        
        return HttpResponse({'result': "ok"})

    else:
        text_path = './data/reasons.txt'
        file_path = os.path.join(os.path.dirname(__file__), text_path)

        with open(file_path, 'r') as file:
            lines = file.readlines()
        reasons_and_tips = [line.strip() for line in lines if line.strip()]

        with connection.cursor() as cursor:
            for i in range(0, len(reasons_and_tips), 2):
                reason = reasons_and_tips[i].replace(":", "")
                tip = reasons_and_tips[i + 1].replace("Tip: ", "")
                insert_query = """
                    INSERT INTO reasons (reason, tips)
                    VALUES (%s, %s)
                """
                values = (reason, tip)
                cursor.execute(insert_query, values)
        
        return HttpResponse({'result': "ok"})