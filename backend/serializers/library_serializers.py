from rest_framework import serializers
from backend.models import PDFBook, Department, CollectionHistory
from backend.utility_file import new_filename

from backend.utility_file import validate_pdf_extension, validate_image_extension, delete_old_path


class DepartmentSerializer(serializers.ModelSerializer):
    person = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        model = Department
        fields = ['person', 'name']

    def update(self, instance, validated_data):
        instance.save(**validated_data)
        return instance

    def create(self, validated_data):
        department = Department(**validated_data)
        department.save()
        return department


class PDFBookSerializer(serializers.ModelSerializer):
    person = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    department = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = PDFBook
        fields = ['person', 'title', 'image', 'author_name', 'file', 'department']

    def validate(self, attrs):
        if validate_pdf_extension(attrs['file']) and validate_image_extension(attrs['image']):
            return attrs
        else:
            serializers.ValidationError("Invalid file passed.")

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        # check if new image or file are uploaded, then delete old image or file path.
        if instance.image != validated_data.get('image', instance.image):
            delete_old_path(instance.image.path)
            instance.image = new_filename(validated_data.get('image', instance.image), instance.title)
        if instance.file != validated_data.get('file', instance.file):
            delete_old_path(instance.file.path)
            instance.file = new_filename(validated_data.get('file', instance.file), instance.title)
        instance.author_name = validated_data.get('author_name', instance.author_name)
        instance.save()
        return instance

    def create(self, validated_data):
        validated_data['image'] = new_filename(validated_data['image'], validated_data['title'])
        validated_data['file'] = new_filename(validated_data['file'], validated_data['title'])
        pdf_book = PDFBook(**validated_data)
        pdf_book.save()
        return pdf_book


class CollectionHistorySerializer(serializers.ModelSerializer):
    person = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    book = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = CollectionHistory
        fields = ['person', 'book']
