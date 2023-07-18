from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from backend.views.auth_views import CreateAccountAPIView, LibrarianListAPIView, LogInTokenObtainPairView, LogoutView, \
    CustomerListAPIView, UpdateAccountAPIView, GetAccountDetailAPIView, CreateProfileImageAPIView, \
    GetChangeProfileImageAPIView
from backend.views.library_views import CreateDepartmentViewSet, CreatePDFBookAPIView, \
    UpdatePDFBookAPIView, UpdateDepartmentAPIView, PDFBookListViewSet, DepartmentListViewSet, \
        DeleteDepartmentAPIView, LibrarianDepartmentListViewSet, LibrarianPDFBookListViewSet

urlpatterns = [
    path('librarians/', LibrarianListAPIView.as_view()),
    path('customers/', CustomerListAPIView.as_view()),
    path('token/', LogInTokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('account-detail/<int:person_id>/', GetAccountDetailAPIView.as_view()),
    path('create-account/', CreateAccountAPIView.as_view()),
    path('update-account/<int:person_id>/', UpdateAccountAPIView.as_view()),
    path('update-book/<int:pdf_book_id>/', UpdatePDFBookAPIView.as_view()),
    path('departments/<int:department_id>/create-book/', CreatePDFBookAPIView.as_view()),
    path('delete-department/<int:id>/', DeleteDepartmentAPIView.as_view()),
    path('create-department/', CreateDepartmentViewSet.as_view()),
    path('update-department/<int:department_id>/', UpdateDepartmentAPIView.as_view()),
    path('departments/<int:department_id>/book-list/', PDFBookListViewSet.as_view()),
    path('department-list/', DepartmentListViewSet.as_view()),
    path('librarian-departments/', LibrarianDepartmentListViewSet.as_view()),
    path('librarian-books/', LibrarianPDFBookListViewSet.as_view()),
    path('logout/', LogoutView.as_view()),
    path('create-profile-image/', CreateProfileImageAPIView.as_view()),
    path('profile-image/',GetChangeProfileImageAPIView.as_view())
]
