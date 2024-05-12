from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView 
# pre-built views that allows to obtain our access and refresh token and to refresh the token

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/register/", CreateUserView.as_view(), name="register"), # when we go to this route, this will going to call the view we created and will allow us to make a new user
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"), # link the pre-built view
    path("api/token/refresh", TokenRefreshView.as_view(), name="refresh_token"), # link the pre-built view
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")),
]
