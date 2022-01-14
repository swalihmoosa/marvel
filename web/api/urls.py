from unicodedata import name
from django.urls import path
from web.api.views import getRoutes, MyTokenObtainPairView




from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('', getRoutes, name='getRoutes'),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]