from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from backend.views.auth_views import CreateAccountAPIView, LibrarianListAPIView, LogInTokenObtainPairView, LogoutView, \
    CustomerListAPIView, UpdateAccountAPIView, GetAccountDetailAPIView
from backend.views.library_views import CreateDepartmentViewSet, CreatePDFBookViewSet, \
    PDFBookRetrieveUpdateDestroyViewSet, DepartmentRetrieveUpdateDestroyViewSet, PDFBookListViewSet, \
    DepartmentListViewSet, DownloadHistoryViewSet

urlpatterns = [
    path('librarians/', LibrarianListAPIView.as_view()),
    path('customers/', CustomerListAPIView.as_view()),
    path('token/', LogInTokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('account-detail/<int:person_id>/', GetAccountDetailAPIView.as_view()),
    path('create-account/', CreateAccountAPIView.as_view()),
    path('account-update/<int:person_id>/', UpdateAccountAPIView.as_view()),
    path('books/<int:pdf_book_id>/', PDFBookRetrieveUpdateDestroyViewSet.as_view()),
    path('departments/<int:department_id>/create-book/', CreatePDFBookViewSet.as_view()),
    path('create-department/', CreateDepartmentViewSet.as_view()),
    path('departments/<int:department_id>/', DepartmentRetrieveUpdateDestroyViewSet.as_view()),
    path('books/', PDFBookListViewSet.as_view()),
    path('departments/', DepartmentListViewSet.as_view()),
    path('books/<int:pdf_book_id>/download-book/', DownloadHistoryViewSet.as_view()),
    path('logout/', LogoutView.as_view()),
]
