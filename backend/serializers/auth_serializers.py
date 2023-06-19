from rest_framework import serializers
from backend.utility_file import PersonType
from backend.models import Person
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class PersonSerializer(serializers.ModelSerializer):
    # return s detail of person
    class Meta:
        model = Person
        exclude = ['is_superuser', 'is_staff', 'groups', 'user_permissions']


class AccountSerializer(serializers.ModelSerializer):
    # return detail of a person's account if created
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=Person.objects.all())]
    )
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=Person.objects.all())]
    )
    password1 = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Person
        fields = ['first_name', 'last_name', 'username', 'email', 'password1', 'password2', 'store_name', 'role',
                  'highest_qualification']

    def validate_role(self, value):
        if value in PersonType.CUSTOMER.value or value in PersonType.LIBRARIAN.value:
            return value
        else:
            raise serializers.ValidationError({"role": "Role should be either librarian or customer."})

    def validate(self, attrs):
        # validate both password are matched
        if attrs['password1'] and attrs['password2'] and attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        person = Person(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            username=validated_data['username'],
            email=validated_data['email'],
            store_name=validated_data['store_name'],
            role=validated_data['role'],
            highest_qualification=validated_data['highest_qualification']
        )
        person.set_password(validated_data['password2'])
        person.save()
        return person


class UpdateAccountSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False)
    email = serializers.CharField(required=False)
    store_name = serializers.CharField(required=False)
    highest_qualification = serializers.CharField(required=False)

    class Meta:
        model = Person
        fields = ['username', 'email', 'store_name', 'highest_qualification']

    def update(self, instance, validated_data):
        instance.save(**validated_data)
        return instance


class LogInTokenObtainPairSerializer(TokenObtainPairSerializer):
    # return a valid token from valid username and password to a person for authentication
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['password'] = user.password
        return token

