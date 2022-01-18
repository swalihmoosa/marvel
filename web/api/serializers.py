from cmath import log
import email
from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}


    def create(self, validated_data):        
        if User.objects.filter(email=validated_data['email']).exists:
            raise serializers.ValidationError({'email' : ("email already exists")})
        if User.objects.filter(email=validated_data['email']).exists:
            raise serializers.ValidationError({'email' : ("email already exists")})
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

        return user