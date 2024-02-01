import os
from openai import OpenAI
from django.http import HttpResponse,JsonResponse

def generate_long_term_plan_view(answers_dict):

        # param1 = request.GET.get('text')
        selected_reasons = answers_dict['selectedReasons']
        confidence = answers_dict['confidence']
        organization = answers_dict['organization']
        mindfulness = answers_dict['mindfulness']
        support = answers_dict['support']

        print(f"received {answers_dict}")

        # openai.api_key= os.getenv("OPENAI_API_KEY")
#         # Construct the prompt
#         prompt = (
#     f'Hello, as a life coach specializing in addressing distractions, I seek your expertise in crafting personalized long-term plans tailored to individual needs. Below is detailed information about the user\'s current situation, and I\'m looking for a phased plan to support their development:\n\n' 
#     f'1. **Types of Distractions:**\n   - Distractions may include {", ".join(selected_reasons)}\n' 
#     f'2. **Level of Confidence in Academic Pursuits:**\n   - The user describes their confidence level in academic pursuits as {confidence}\n' 
#     f'3. **Organization and Planning:**\n   - The user\'s organization and planning skills are described as {organization}\n' 
#     f'4. **Familiarity with Mindfulness Practices:**\n   - The user\'s familiarity with mindfulness practices is described as {mindfulness}\n' 
#     f'5. **App Support for Mental Well-being:**\n   - The user hopes the app can support them in {support}\n\n' 
#     'Considering this diverse information, I am seeking a comprehensive, phased long-term plan (4 Phases) with a focus on practical tips and guidance for each phase:\n' 
#     'the template is like:' 
#     'Phase #(phase number): what this phase is about \n\n' 
#     ' - Phase main points: \n\n' 
#     ' - 1-2 practical and concise tips for the user to practice during this phase\n\n' 
#     'To make this plan more personalized, please provide additional insights and 2-3 practical and concise tips or exercises tailored to the user\'s unique situation. Imagine you are the user\'s personal life trainer, offering actionable steps for their well-being and productivity.\n\n' 
#     'Thank you for your expertise in crafting personalized and effective long-term plans for individuals with diverse needs.'
# )
#         print("the complete prompt is" + prompt)
#         model = "gpt-3.5-turbo"
#         response = openai.Completion.create(engine=model, prompt=prompt, max_tokens =500)
#         generated_text =response.choices[0].text

        client = OpenAI()


        messages = [
                {"role": "system", "content": "You are a life coach specializing in addressing distractions."},
                {"role": "user", "content": 
            f"Craft a personalized long-term plan for me based on my situation:\n\n"
            f"1. **Types of Distractions:** {', '.join(selected_reasons)}\n"
            f"2. **Level of Confidence in Academic Pursuits:** {confidence}\n"
            f"3. **Organization and Planning:** {organization}\n"
            f"4. **Familiarity with Mindfulness Practices:** {mindfulness}\n"
            f"5. **App Support for Mental Well-being:** {support}\n\n"
            "Considering this diverse information, I am seeking a comprehensive, phased long-term plan (4 Phases) with a focus on practical tips and guidance for each phase:\n"
            "the template is like:\n"
            "Phase #(phase number): what this phase is about\n\n"
            " - Phase main points:\n\n"
            " - 1-2 practical and concise tips for the user to practice during this phase\n\n"
            "To make this plan more personalized, please provide additional insights and 2-3 practical and concise tips or exercises tailored to the user's unique situation. Imagine you are the user's personal life trainer, offering actionable steps for their well-being and productivity.\n\n"
            "Thank you for your expertise in crafting personalized and effective long-term plans for individuals with diverse needs."
        },
        ]

        # Make a request to the chat model
        completion = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages
        )

        # print(completion)
        # Extract the generated text from the response
        generated_text = completion.choices[0].message.content
        print(generated_text)
        return generated_text
        # return JsonResponse({'sentence': generated_text})
     

def generate_daily_plan_view(practical_tips):

        print("in generate_daily_plan_view, the practical_tips is: ")
        print(practical_tips)
        client = OpenAI()
   
        messages = [
                {"role": "system", "content": "You are a life coach specializing in addressing distractions."},
                {"role": "user", "content": 
            f"Craft a personalized daily plan for me based on the previous personalized tips for my current phase :\n\n"
            f"1. **personalized practical tips:** {practical_tips}\n"
            "please make the tips be concise, and make the language be interesting and kind to the user, Thank you.Start with something like how are you doing today! You are on an exciting journey something like that.Please inlcude. Also, please limit the generated output to have word limit to 100"
        },
        ]
  # Make a request to the chat model
        completion = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages
        )

        # print(completion)
        # Extract the generated text from the response
        generated_text = completion.choices[0].message.content
        print(generated_text)
        return generated_text
        
     #      prompt = """
     #      Hey there! I'm a life coach assistant, and I need your help crafting a casual and encouraging daily plan for a user in Phase 2 of their personal development journey. 

     #      The user's name is [User's Name], and here are some key points:

     #      - They're currently in Phase 2 of their long-term plan.
     #      - Last time, they mentioned [mention something from the last session, e.g., being bothered by a certain distraction].
     #      - They should focus on [mention a couple of tips or practices from their long-term plan, e.g., practicing mindfulness and taking it slow with tasks].
     #      - Encourage them to reflect on any insights from the questions asked.
     #      - Add a fun challenge, like trying out a tip from Phase 2.

     #      Keep it casual, positive, and motivating! Thanks a bunch!
     #      """

#      prompt = ""
#      print("the complete prompt is" + prompt)

     #    model = "text-davinci-003"
     #    response = openai.Completion.create(engine=model, prompt=prompt, max_tokens =230)
     #    generated_text =response.choices[0].text

#      generated_text  =" What's up man! I do not have very much things to tell you !!!"
