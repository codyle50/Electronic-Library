from rest_framework import serializers
from backend.models import PDFBook, Department, CollectionHistory
from backend.utility_file import new_filename, PersonType
from backend.utility_file import validate_pdf_extension, validate_image_extension, delete_old_path


class DepartmentSerializer(serializers.ModelSerializer):
    # create and update a department by librarian
    person = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        model = Department
        fields = ['id', 'person', 'name']

    def validate_person(self, value):
        if value.role in PersonType.LIBRARIAN.value:
            return value
        else:
            raise serializers.ValidationError(
                {"person": "Your role is not a librarian. Only librarian can create department."})

    def create(self, validated_data):
        department = Department(**validated_data)
        department.save()
        return department


class PDFBookSerializer(serializers.ModelSerializer):
    # create and update PDFBook by librarian with valid data
    person = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    department = serializers.PrimaryKeyRelatedField(read_only=True)
    
    class Meta:
        model = PDFBook
        fields = ['id', 'person', 'title', 'image', 'author_name', 'file','description', 'department']

    def validate(self, attrs):
        if attrs['file'] or attrs['image']:
            if validate_pdf_extension(attrs['file']) or validate_image_extension(attrs['image']):
                return attrs
            else:
                raise serializers.ValidationError("Invalid file passed.")

    def validate_person(self, value):
        if value.role in PersonType.LIBRARIAN.value:
            return value
        else:
            raise serializers.ValidationError(
                {"person": "Your role is not a librarian. Only librarian can create department."})

    def update(self, instance, validated_data):
        # check if new image or file are uploaded, then delete old image or file path.
        instance.title = validated_data['title']
        if validated_data['file']:
            delete_old_path(instance.file.path)
            validated_data['file'] = new_filename(validated_data['file'], validated_data['title'])
            instance.file = validated_data['file']
        if validated_data['image']:
            delete_old_path(instance.image.path)
            validated_data['image'] = new_filename(validated_data['image'], validated_data['title'])
            instance.image = validated_data['image']
        instance.description =validated_data['description']
        instance.author_name =validated_data['author_name']
        instance.save()
        print(instance.title)
        return instance

    def create(self, validated_data):
        validated_data['image'] = new_filename(validated_data['image'], validated_data['title'])
        validated_data['file'] = new_filename(validated_data['file'], validated_data['title'])
        pdf_book = PDFBook(**validated_data)
        pdf_book.save()
        return pdf_book


class CollectionHistorySerializer(serializers.ModelSerializer):
    # History for customer who will download a pdf book file
    person = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    book = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = CollectionHistory
        fields = ['person', 'book']
