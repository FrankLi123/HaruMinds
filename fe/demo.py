import pyautogui
import random
import tkinter as tk
from PIL import Image, ImageTk
from helper import request_for_gen_sentence, get_input

x = 1400
y = 900
x_offset = 0
y_offset = 0
cycle = 0
check = 1
idle_num =[1,2,3,4]
sleep_num = [10,11,12,13,15]
walk_left = [6,7]
walk_right = [8,9]
event_number = random.randrange(1,3,1)
impath = '/Users/zongchenli/Documents/Side_Project/Project/online-chat-project/fe/gif/'
isPopUpWindowStarted = False
events = ["Eat", "Play", "Talk", "Setting"]
main_path = "http://localhost:8000/"
#transfer random no. to event
def event(cycle,check,event_number):
    global x
    if event_number in idle_num:
        check = 0
        print('idle')
        window.after(400,update,cycle,check,event_number) #no. 1,2,3,4 = idle
    
    elif event_number == 5:
        check = 1
        print('from idle to sleep')
        window.after(100,update,cycle,check,event_number) #no. 5 = idle to sleep
    
    elif event_number in walk_left:
        check = 4
        print('walking towards left')
        window.after(100,update,cycle,check,event_number)#no. 6,7 = walk towards left
    
    elif event_number in walk_right:
        check = 5
        print('walking towards right')
        window.after(100,update,cycle,check,event_number)#no 8,9 = walk towards right
    elif event_number in sleep_num:
        check  = 2
        print('sleep')
        window.after(1000,update,cycle,check,event_number)#no. 10,11,12,13,15 = sleep
    elif event_number == 14:
        check = 3
        print('from sleep to idle')
        window.after(100,update,cycle,check,event_number)#no. 15 = sleep to idle


#making gif work 
def gif_work(cycle,frames,event_number,first_num,last_num):
 if cycle < len(frames) -1:
  cycle+=1
 else:
  cycle = 0
  event_number = random.randrange(first_num,last_num+1,1)

 return cycle,event_number



def update(cycle,check,event_number):
 global x
 #idle
 if check ==0:
  frame = idle[cycle]
  cycle ,event_number = gif_work(cycle,idle,event_number,1,9)
  
 #idle to sleep
 elif check ==1:
  frame = idle_to_sleep[cycle]
  cycle ,event_number = gif_work(cycle,idle_to_sleep,event_number,10,10)
#sleep
 elif check == 2:
  frame = sleep[cycle]
  cycle ,event_number = gif_work(cycle,sleep,event_number,10,15)
#sleep to idle
 elif check ==3:
  frame = sleep_to_idle[cycle]
  cycle ,event_number = gif_work(cycle,sleep_to_idle,event_number,1,1)
#walk toward left
 elif check == 4:
  frame = walk_positive[cycle]
  cycle , event_number = gif_work(cycle,walk_positive,event_number,1,9)
  x -= 3

#walk towards right
 elif check == 5:
  frame = walk_negative[cycle]
  cycle , event_number = gif_work(cycle,walk_negative,event_number,1,9)
  x -= -3

 print(" x is : " + str(x) + " , y is : " +str(y))

 window.geometry('100x100+'+str(x)+ '+'+ str(y))
 label.configure(image=frame)
 window.after(1,event,cycle,check,event_number)


def on_drag_start(event):
  global x_offset, y_offset
  x_offset = event.x
  y_offset = event.y

def on_drag_motion(event):
  global x,y

  x = event.x_root - x_offset
  y = event.y_root - y_offset

  window.geometry('100x100+'+str(x)+ '+'+ str(y))




def close_event_list(event_list):
  event_list.destroy()
  
selected_option = None

def display_activity(event):
  
  global selected_option

  event_list = tk.Toplevel(window)
  event_list.wm_overrideredirect(True)
  event_list.geometry(f"+{event.x_root}+{event.y_root}")

  # Add a close button
  close_but = tk.Button(event_list, text="X", fg="red", command=lambda: close_event_list(event_list))
  close_but.pack(anchor="ne")

  

  # Add three buttons
  for event in events:
    option_label = tk.Label(event_list, text= event)
    option_label.pack()
    option_label.bind("<Button-1>", lambda e, option= event: option_click(option, event_list))

    #If the option is selected, then highlight it
    if event == selected_option:
      option_label.configure(bg="lightblue")

  event_list.bindtags((event_list, "all", ".", "EvenetList","Toplevel", window))



def option_click(chosen_option, event_list):

  global selected_option

  for widget in event_list.winfo_children():
     widget.configure(bg="white")

  selected_option = chosen_option

  global isPopUpWindowStarted 
  # After selection, paint the option background color to be 'lightblue'
  for widget in event_list.winfo_children():
    if widget.cget("text") == selected_option:
      widget.configure(bg="lightblue")
  
  if selected_option == "Setting":
      open_setting_board(event_list)

  if selected_option == "Talk":
      open_talk_window(event_list)
  if selected_option == "Eat": 

    if isPopUpWindowStarted == True:
      print("the Pop Up Window has already been started.")
    else:
      isPopUpWindowStarted = True
      window.after(5000, lambda: start_timer(event_list))

  if selected_option == "Play":
      open_response_window(event_list)
      # image_window = tk.Tk()
      # image = Image.open(impath+'talk_frame.png',)
      # photo = ImageTk.PhotoImage(image)

      # text_label = tk.Label(image_window, text="Hello, Nice to meet you!! I have a lot of things to say!")
      # text_label.pack()

      # image_label = tk.Label(image= photo)
      # image_label.pack()

      # image_window.mainloop()

  # print(f"the selected option is : {chosen_option}")



def open_setting_board(event_list):
  setting_window = tk.Toplevel(window)
  setting_window.geometry("250x250")

  #calculate the coordinates for the window
  event_list_width = event_list.winfo_width()
  main_window_x = window.winfo_x()

  talk_window_x = main_window_x + event_list_width + 10
  talk_window_y = event_list.winfo_y()
  setting_window.geometry(f"+{talk_window_x}+{talk_window_y}")

  option_label = tk.Label(setting_window, text="Select the Preference Option:")
  option_label.pack(pady=10)

  option_var = tk.StringVar(setting_window)
  options = ["Supportive", "Suggestive"]
  option_var.set(options[0])

  option_menu = tk.OptionMenu(setting_window,option_var, *options)
  option_menu.pack(pady=10)


  option_label_2 = tk.Label(setting_window, text="Select the Preference Option:")
  option_label_2.pack(pady=10)

  option_var_2 = tk.StringVar(setting_window)
  options_2 = ["5 min", "15 min", "30 min", "50 min"]
  option_var_2.set(options_2[0])

  option_menu_2 = tk.OptionMenu(setting_window,option_var_2, *options_2)
  option_menu_2.pack(pady=10)


  setting_url = main_path + "setting/param/"

  button = tk.Button(setting_window, text="Get Input", command=lambda: get_input(option_var, option_var_2,setting_url))
  button.pack(pady=10)


def pop_up_window(event_list):
  pop_up_window = tk.Toplevel()

  pop_up_window.geometry("500x130")

  #calculate the coordinates for the window
  event_list_width = event_list.winfo_width()
  main_window_x = window.winfo_x()

  talk_window_x = main_window_x - 3* event_list_width
  talk_window_y = event_list.winfo_y() - 140

  pop_up_window.geometry(f"+{talk_window_x}+{talk_window_y}")

  url = main_path + "/request"
  generated_response = request_for_gen_sentence(url)

  pop_up_label = tk.Label(pop_up_window, text = generated_response)
  pop_up_label.pack(pady=10)
  pop_up_window.configure(bg="black")
  pop_up_window.after(8000,pop_up_window.destroy)


def start_timer(event_list):
  pop_up_window(event_list)
  window.after(15000, lambda: start_timer(event_list))



def open_response_window(event_list):
  talk_window = tk.Toplevel(window)
  talk_window.geometry("200x100")

  #calculate the coordinates for the window
  event_list_width = event_list.winfo_width()
  main_window_x = window.winfo_x()

  talk_window_x = main_window_x + event_list_width + 10
  talk_window_y = event_list.winfo_y()

  talk_window.geometry(f"+{talk_window_x}+{talk_window_y}")
  
  url = main_path + "request"
  generated_response = request_for_gen_sentence(url)

  #Add widgets for the talk window
  talk_label = tk.Label(talk_window, text=generated_response)
  talk_label.pack()

  #Add a close button for the talk window
  close_button = tk.Button(talk_window, text="Close", fg="red", command=talk_window.destroy)
  close_button.pack()

def open_talk_window(event_list):

  talk_window = tk.Toplevel(window)
  talk_window.geometry("200x100")

  #calculate the coordinates for the window
  event_list_width = event_list.winfo_width()
  main_window_x = window.winfo_x()

  talk_window_x = main_window_x + event_list_width + 10
  talk_window_y = event_list.winfo_y()

  talk_window.geometry(f"+{talk_window_x}+{talk_window_y}")

  #Add widgets for the talk window
  talk_label = tk.Label(talk_window, text="This is the talk window")
  talk_label.pack()

  #Add a close button for the talk window
  close_button = tk.Button(talk_window, text="Close", fg="red", command=talk_window.destroy)
  close_button.pack()


# open_talk_window
last_click_time = 0

def click_pet(event):
    display_activity(event)

window = tk.Tk()

window.overrideredirect(1)
# window.wm_attributes("-topmost",True)
window.wm_attributes("-transparent",True)

window.config(bg='')
window.geometry("+300+300")

# window.attributes("-transparent", 1)

#call buddy's action gif
idle = [tk.PhotoImage(file=impath+'idle.gif',format = 'gif -index %i' %(i)) for i in range(5)]#idle gif
idle_to_sleep = [tk.PhotoImage(file=impath+'idle_to_sleep.gif',format = 'gif -index %i' %(i)) for i in range(8)]#idle to sleep gif
sleep = [tk.PhotoImage(file=impath+'sleep.gif',format = 'gif -index %i' %(i)) for i in range(3)]#sleep gif
sleep_to_idle = [tk.PhotoImage(file=impath+'sleep_to_idle.gif',format = 'gif -index %i' %(i)) for i in range(8)]#sleep to idle gif
walk_positive = [tk.PhotoImage(file=impath+'walking_positive.gif',format = 'gif -index %i' %(i)) for i in range(8)]#walk to left gif
walk_negative = [tk.PhotoImage(file=impath+'walking_negative.gif',format = 'gif -index %i' %(i)) for i in range(8)]#walk to right gif


# window.image = tk.PhotoImage(file=impath+'idle_to_sleep.gif')

#window configuration
# window.config(highlightbackground='white')
label = tk.Label(window)
window.configure(bg="black")
# label.config(bg='-transparent')


label.pack()
print(tk.TkVersion)

#loop the program
window.after(1,update,cycle,check,event_number)

window.bind("<Button-1>", on_drag_start)
window.bind("<B1-Motion>", on_drag_motion)
label.bind("<Double-Button-1>", click_pet)



#Start the timer
# window.after(5000, start_timer)

window.mainloop()
