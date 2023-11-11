import requests
import json

client_preference = None
client_time = None

def request_for_gen_sentence(url):


    #Send the user input to the backend server
    response = requests.get(url)

    res_status = response.status_code

    if res_status == 200:
        print(f'Successfully send the request.')
        print(response.text)

        parsed_sentence = parse_test(response.text)
        return parsed_sentence
    else:
        print(f'Error: Unable to send the request {res_status}. Please try later.')



def parse_test(data):

    data = json.loads(data)

    parsed_sentence = data["sentence"]

    return parsed_sentence

def get_input(option_var, option_var_2, url):
    user_input_pref = option_var.get()
    user_input_time = option_var_2.get()
    print(f'User input: {user_input_pref}  |  {user_input_time}')

    client_preference = user_input_pref
    client_time = user_input_time

    params = {
        'param1':client_preference
    }

    # Send the setting variables to the backend server
    response = requests.get(url, params=params)
    res_status = response.status_code

    if res_status == 200:
        print(f'Successfully sending the request.')
        print(response.text)

        return response.text
    else:
        print(f'Error. Please try later.')


