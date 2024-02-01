"""
URL configuration for server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from pages import views

# from .views import home_page_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path("hello/", views.home_page_view, name="home"),
    path("request/", views.generate_response_view, name="generate_A_response"),
    path("request/ai", views.generate_ai_response_view, name="generate_ai_response_view"),
    path("setting/param/", views.client_setting_view, name="client_setting_view"),
    path("login/", views.login_view, name="login_view"),
    path("register/", views.register_view, name="register_view"),
    path("result/", views.collected_data_view, name="collected_data_view"),
    path("retrieve/", views.retrieve_data_view, name="retrieve_data_view"),
    path("retrieve/daily_plan", views.user_daily_plan_view, name="  user_daily_plan_view"),
    path("generate/", views.store_generated_texts_view, name="store_generated_texts_view"),
    path("setting/initialSetting/", views.user_initial_setting_view, name="user_initial_setting_view"),
    path("retrieve/reasons/", views.retreive_reasons_view, name="retreive_reasons_view"),
    path("retrieve/user_data/", views.retreive_user_data_view, name="retreive_user_data_view"),
    path("retrieve/long_term_plan", views.retreive_long_term_plan_view, name="retreive_long_term_plan_view")
]
