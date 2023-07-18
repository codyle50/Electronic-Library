from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateAPIView, get_object_or_404, \
    DestroyAPIView
from backend.models import Department, PDFBook
from backend.serializers.library_serializers import DepartmentSerializer, PDFBookSerializer
from rest_framework.permissions import IsAuthenticated


# Update Department only by librarian
class UpdateDepartmentAPIView(RetrieveUpdateAPIView):
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated, ]
    lookup_field = 'department_id'

    def get_object(self):
        department_id = self.kwargs["department_id"]
        return get_object_or_404(Department, id=department_id)


# Delete Department only by librarian
class DeleteDepartmentAPIView(DestroyAPIView):
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated, ]
    lookup_field = 'id'
    
    def get_queryset(self):
        return Department.objects.filter(id= self.kwargs['id'], person = self.request.user.id)
    

# Create Department only by librarian
class CreateDepartmentViewSet(CreateAPIView):
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(person=self.request.user)


# get a list of all departments for customer
class DepartmentListViewSet(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DepartmentSerializer
    queryset =Department.objects.all()


# get a list of only those Departments which are created by librarian
class LibrarianDepartmentListViewSet(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DepartmentSerializer
    
    def get_queryset(self):
        return Department.objects.filter(person = self.request.user)

# get a list of only those PDFBooks which are created by librarian
class LibrarianPDFBookListViewSet(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PDFBookSerializer
    
    def get_queryset(self):
        return PDFBook.objects.filter(person = self.request.user)

# get PDFBook list for customer
class PDFBookListViewSet(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PDFBookSerializer
    lookup_field = 'department_id'

    def get_queryset(self):
        department = Department.objects.get(id=self.kwargs["department_id"])
        return PDFBook.objects.filter(department=department)


# update PDFBook only by librarian
class UpdatePDFBookAPIView(RetrieveUpdateAPIView):
    serializer_class = PDFBookSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pdf_book_id'

    def get_object(self):
        pdf_book_id = self.kwargs["pdf_book_id"]
        return get_object_or_404(PDFBook, id=pdf_book_id)
    

# Create PDFBook only by librarian
class CreatePDFBookAPIView(CreateAPIView):
    serializer_class = PDFBookSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'department_id'

    def perform_create(self, serializer):
        department_id = Department.objects.get(id=self.kwargs['department_id'])
        serializer.save(person=self.request.user, department=department_id)

