from rest_framework import serializers
from backend.utility_file import PersonType, validate_image_extension, new_profile_image_name
from backend.models import Person, ProfileImage
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class PersonSerializer(serializers.ModelSerializer):
    # get required detail of the person
    class Meta:
        model = Person
        exclude = ['is_superuser', 'is_staff', 'groups', 'user_permissions']


class AccountSerializer(serializers.ModelSerializer):
    # a new account for person with valid data
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
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'password1', 'password2', 'store_name', 'role',
                  'highest_qualification']

    def validate_role(self, value):
        # valid role if person is either librarian or customer
        if value in PersonType.CUSTOMER.value or value in PersonType.LIBRARIAN.value:
            return value
        else:
            raise serializers.ValidationError({"role": "Role should be either librarian or customer."})
   

    def validate(self, attrs):
        # validate to both passwords if they are matched
        if attrs['password1'] and attrs['password2'] and attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        # create an account if serializer's data are valids
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
    class Meta:
        model = Person
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'store_name', 'role',
                  'highest_qualification']


class ProfileImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileImage
        fields = ['id', 'image']
    
    def validate_profile_image(self, value):
        try:
            if validate_image_extension(value):
                return value
        except Exception as e:
            raise serializers.ValidationError(e)


class LogInTokenObtainPairSerializer(TokenObtainPairSerializer):
    # return a valid token from valid username and password to a person to authentication
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['password'] = user.password
        return token

