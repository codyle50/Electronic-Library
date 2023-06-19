from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView, get_object_or_404
from backend.models import Department, PDFBook, CollectionHistory
from backend.serializers.library_serializers import DepartmentSerializer, PDFBookSerializer, \
    CollectionHistorySerializer
from rest_framework.permissions import IsAuthenticated


class DepartmentRetrieveUpdateDestroyViewSet(RetrieveUpdateDestroyAPIView):
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated, ]
    lookup_field = 'department_id'

    def get_object(self):
        department_id = self.kwargs["department_id"]
        return get_object_or_404(Department, id=department_id)


class CreateDepartmentViewSet(CreateAPIView):
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(person=self.request.user)


class DepartmentListViewSet(ListAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


class PDFBookListViewSet(ListAPIView):
    queryset = PDFBook.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = PDFBookSerializer


class PDFBookRetrieveUpdateDestroyViewSet(RetrieveUpdateDestroyAPIView):
    serializer_class = PDFBookSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pdf_book_id'

    def get_object(self):
        pdf_book_id = self.kwargs["pdf_book_id"]
        return get_object_or_404(PDFBook, id=pdf_book_id)


class CreatePDFBookViewSet(CreateAPIView):
    serializer_class = PDFBookSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'department_id'

    def perform_create(self, serializer):
        department_id = Department.objects.get(id=self.kwargs['department_id'])
        serializer.save(person=self.request.user, department=department_id)


class DownloadHistoryViewSet(ListAPIView, CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = CollectionHistory.objects.all()
    serializer_class = CollectionHistorySerializer
    lookup_field = 'pdf_book_id'

    def perform_create(self, serializer):
        book_id = PDFBook.objects.get(id=self.kwargs["pdf_book_id"])
        serializer.save(person=self.request.user, book=book_id)
