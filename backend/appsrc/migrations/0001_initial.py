import datetime
import django.contrib.auth.models
import django.db.models.deletion
import django.utils.timezone

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    def insertData(apps, schema_editor):
        Roles = apps.get_model('appsrc', 'Roles')
        role = Roles(id = 1, name = 'user')
        role.save()
        role = Roles(id = 2, name = 'moderator')
        role.save()
        role = Roles(id = 3, name = 'admin')
        role.save()

        User = apps.get_model('appsrc', 'YouYodaUser')
        user = User(id=1, hide_my_data = True, first_name = 'Yoda', last_name = 'Rivensky',
            location = 'Ukraine, Rivne', username = 'Yoda-admin', password = '$2y$12$UF3XjBwS3Oz6phT4WfXPkepcUuro.4BxotLKiY22QonRm2/cEYzBa',
            email = 'youyoda.academy@gmail.com', about_me = "", birth_date = datetime.datetime.now(), phone_number = "",
            is_active = True, avatar_url = '', is_trainer = True, role_id = Roles.objects.get(id=3, name='admin'))
        user.save()
        user = User(id=2, hide_my_data = True, first_name = 'Yoda', last_name = 'Rivensky',
            location = 'Ukraine, Rivne', username = 'Yoda-moderator', password = '$2y$12$ce08PZUTOELFeDh3EewjsuhOBMxbp.lBQBQ0cODMtDJp13sXMRDk2',
            email = 'test@test.com', about_me = "", birth_date = datetime.datetime.now(), phone_number = "",
            is_active = True, avatar_url = '', is_trainer = True, role_id = Roles.objects.get(id=2, name='moderator'))
        user.save()
        user = User(id=3, hide_my_data = False, first_name = 'Yoda', last_name = 'Rivensky',
            location = 'Ukraine, Rivne', username = 'Yoda-user', password = '$2y$12$bmih513m88oXDBMyHCzWF.dpm8jo/sfO2IffgVxrSPgTsx6iJFXYm',
            email = 'test1@test.com', about_me = "", birth_date = datetime.datetime.now(), phone_number = "",
            is_active = True, avatar_url = '', is_trainer = False, role_id = Roles.objects.get(id=1, name='user'))
        user.save()

    operations = [
        migrations.CreateModel(
            name='Roles',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='YouYodaUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hide_my_data', models.BooleanField(default=False)),
                ('first_name', models.CharField(max_length=20, null=True)),
                ('last_name', models.CharField(max_length=20, null=True)),
                ('location', models.TextField(blank=True, null=True)),
                ('username', models.CharField(max_length=20, unique=True)),
                ('password', models.CharField(max_length=80)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('about_me', models.TextField(blank=True, null=True)),
                ('birth_date', models.DateField(blank=True, null=True)),
                ('phone_number', models.CharField(blank=True, max_length=9, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('avatar_url', models.CharField(max_length=80, null=True)),
                ('is_trainer', models.BooleanField(default=False)),
                ('role_id', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='appsrc.Roles')),
            ],
        ),
        migrations.RunPython(insertData),
    ]
