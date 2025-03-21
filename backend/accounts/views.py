from rest_framework.views import APIView
from rest_framework import permissions
from django.contrib.auth.models import User
from user_profile.models import UserProfile
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator

# Create your views here.
@method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']
        re_password = data['re_password']

        if password == re_password:
            if User.objects.filter(username=username).exists():
                return Response({ 'error': 'Username already exists' })
            else:
                if len(password) < 6:
                    return Response({ 'error': 'Password must be at least 6 characters' }) 
                else:
                    user = User.objects.create_user(username=username, password=password)

                    user = User.objects.get(id=user.id)

                    user_profile = UserProfile.objects.create(user=user, first_name='', last_name='')

                    return Response({ 'success': 'User created successfully' })

        else:
            return Response({ 'error': 'Passwords do not match' })

@method_decorator(ensure_csrf_cookie, name='dispatch')     
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({ 'success': 'CSRF cookie set' })