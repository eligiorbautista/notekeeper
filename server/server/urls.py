from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, PasswordResetRequestView, PasswordResetConfirmView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/register/", CreateUserView.as_view(), name="register"), 
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh", TokenRefreshView.as_view(), name="refresh_token"), 
    path('api/password-reset/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('api/password-reset-confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),  
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")),
]
