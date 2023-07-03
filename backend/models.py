import os

from backend.utility_file import validate_pdf_extension, validate_image_extension
from django.contrib.auth.validators import ASCIIUsernameValidator
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class Person(AbstractUser):
    username_validator = ASCIIUsernameValidator()
    username = models.CharField(_("username"),
                                max_length=150,
                                unique=True,
                                help_text=_("Required. letters, digits and @/./+/-/_ only."),
                                validators=[username_validator],
                                error_messages={
                                    "unique": _("A user with that username already exists."),
                                }, )
    email = models.EmailField(_("email address"),
                              unique=True,
                              error_messages={
                                  "unique": _("A user with that email address already exists."),
                              }, )

    store_name = models.CharField(max_length=500)
    role = models.CharField(max_length=100)
    highest_qualification = models.CharField(max_length=300)

    def clean(self):
        self.username = self.username.lower()
        self.email = self.__class__.objects.normalize_email(self.email).lower()
        super().clean()

    def __str__(self):
        return f'{self.id}. {self.first_name} {self.last_name}'


class Department(models.Model):
    name = models.CharField(max_length=500, unique=True)
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    created_department_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.id} {self.name}'


class PDFBook(models.Model):

    def store_file_path(self, filename):
        # File path is MEDIA_ROOT/<person>/<department.name>/<filename>
        return "{}/{}/{}".format(self.person, self.department.name, filename)

    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    title = models.CharField(max_length=1500, unique=True)
    image = models.ImageField(upload_to=store_file_path, validators=[validate_image_extension])
    author_name = models.CharField(max_length=500)
    file = models.FileField(upload_to=store_file_path, validators=[validate_pdf_extension])
    description = models.CharField(max_length=5000)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    upload_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.id}. {self.department.name}- {self.title}'

    def delete(self, *args, **kwargs):
        os.remove(self.image.path)
        os.remove(self.file.path)
        super(PDFBook, self).delete(*args, **kwargs)


class CollectionHistory(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    book = models.ForeignKey(PDFBook, on_delete=models.CASCADE)
    downloaded_date = models.DateTimeField(auto_now=True)
