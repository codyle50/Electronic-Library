from rest_framework import status

from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateAPIView, get_object_or_404, \
    RetrieveAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from backend.serializers.auth_serializers import PersonSerializer, AccountSerializer, \
    LogInTokenObtainPairSerializer
from backend.models import Person
from backend.utility_file import PersonType
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.models import Q
from rest_framework_simplejwt.views import TokenObtainPairView


class CreateAccountAPIView(CreateAPIView):
    # create a new person's account
    serializer_class = AccountSerializer
    permission_classes = [AllowAny, ]


class GetAccountDetailAPIView(RetrieveAPIView):
    # get person's detail
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'person_id'

    def get_object(self):
        person_id = self.kwargs['person_id']
        return get_object_or_404(Person, id=person_id)


class UpdateAccountAPIView(RetrieveUpdateAPIView):
    serializer_class = AccountSerializer
    lookup_field = 'person_id'
    permission_classes = [IsAuthenticated]

    def get_object(self):
        person_id = self.kwargs["person_id"]
        return get_object_or_404(Person, id=person_id)


class LogInTokenObtainPairView(TokenObtainPairView):
    serializer_class = LogInTokenObtainPairSerializer


class CustomerListAPIView(ListAPIView):
    # Get list of those persons whose role is customer
    permission_classes = [IsAuthenticated]
    serializer_class = PersonSerializer
    queryset = Person.objects.filter(
        Q(role=PersonType.CUSTOMER.value[0]) |
        Q(role=PersonType.CUSTOMER.value[1]))


class LibrarianListAPIView(ListAPIView):
    # Get list of those persons whose role is librarian
    permission_classes = [IsAuthenticated]
    serializer_class = PersonSerializer
    queryset = Person.objects.filter(
        Q(role=PersonType.LIBRARIAN.value[0]) |
        Q(role=PersonType.LIBRARIAN.value[1]))


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
