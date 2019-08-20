import datetime
import django.contrib.auth.models
import django.db.models.deletion
import django.utils.timezone

from django.conf import settings
from django.db import migrations, models


def insertData(apps, schema_editor):
    Roles = apps.get_model('appsrc', 'Roles')
    Roles.objects.create(
        id=1, name="user"
    )
    Roles.objects.create(
        id=2, name="moderator"
    )
    Roles.objects.create(
        id=3, name="admin"
    )
    User = apps.get_model('appsrc', 'YouYodaUser')
    User.objects.create(id=1, hide_my_data = True, first_name = 'Yoda', last_name = 'Rivensky',
        location = 'Ukraine, Rivne', username = 'Yoda-admin', password = '$2y$12$UF3XjBwS3Oz6phT4WfXPkepcUuro.4BxotLKiY22QonRm2/cEYzBa',
        email = 'youyoda.academy@gmail.com', about_me = "", birth_date = datetime.datetime.now(), phone_number = "",
        is_active = True, avatar_url = '', is_trainer = True, role_id = 3)
    User.objects.create(id=2, hide_my_data = True, first_name = 'Yoda', last_name = 'Rivensky',
        location = 'Ukraine, Rivne', username = 'Yoda-moderator', password = '$2y$12$ce08PZUTOELFeDh3EewjsuhOBMxbp.lBQBQ0cODMtDJp13sXMRDk2',
        email = 'test@test.com', about_me = "", birth_date = datetime.datetime.now(), phone_number = "",
        is_active = True, avatar_url = '', is_trainer = True, role_id = 2)
    User.objects.create(id=3, hide_my_data = False, first_name = 'Yoda', last_name = 'Rivensky',
        location = 'Ukraine, Rivne', username = 'Yoda-user', password = '$2y$12$bmih513m88oXDBMyHCzWF.dpm8jo/sfO2IffgVxrSPgTsx6iJFXYm',
        email = 'test1@test.com', about_me = "", birth_date = datetime.datetime.now(), phone_number = "",
        is_active = True, avatar_url = '', is_trainer = False, role_id = 1)


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

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
                ('is_active', models.BooleanField(default=False, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('hide_my_data', models.BooleanField(default=False)),
                ('first_name', models.CharField(blank=True, max_length=20, null=True)),
                ('last_name', models.CharField(blank=True, max_length=20, null=True)),
                ('location', models.TextField(blank=True, null=True)),
                ('username', models.CharField(max_length=20, unique=True)),
                ('password', models.CharField(max_length=80)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('about_me', models.TextField(blank=True, null=True)),
                ('birth_date', models.DateField(blank=True, null=True)),
                ('phone_number', models.CharField(blank=True, max_length=13, null=True)),
                ('avatar_url', models.CharField(blank=True, max_length=80, null=True)),
                ('is_trainer', models.BooleanField(default=False)),
                ('role', models.ForeignKey(default=1, on_delete=django.db.models.deletion.SET_DEFAULT, to='appsrc.Roles')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Categories',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Courses',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('coursename', models.CharField(max_length=60)),
                ('status', models.CharField(max_length=10)),
                ('description', models.TextField()),
                ('is_public', models.BooleanField()),
                ('start_date', models.DateTimeField()),
                ('duration', models.DurationField()),
                ('rate', models.IntegerField()),
                ('members_limit', models.IntegerField()),
                ('location', models.TextField()),
                ('cover_url', models.CharField(max_length=80)),
                ('category_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appsrc.Categories')),
            ],
        ),
        migrations.CreateModel(
            name='Events',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60)),
                ('description', models.TextField()),
                ('date', models.DateTimeField()),
                ('location', models.TextField()),
                ('cover_url', models.CharField(max_length=80)),
                ('category_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appsrc.Categories')),
            ],
        ),
        migrations.CreateModel(
            name='UserStatuses',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(max_length=40)),
            ],
        ),
        migrations.AddField(
            model_name='youyodauser',
            name='date_joined',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined'),
        ),
        migrations.AddField(
            model_name='youyodauser',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups'),
        ),
        migrations.AddField(
            model_name='youyodauser',
            name='i_like',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='youyodauser',
            name='is_staff',
            field=models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status'),
        ),
        migrations.AddField(
            model_name='youyodauser',
            name='is_superuser',
            field=models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status'),
        ),
        migrations.AddField(
            model_name='youyodauser',
            name='last_login',
            field=models.DateTimeField(blank=True, null=True, verbose_name='last login'),
        ),
        migrations.AddField(
            model_name='youyodauser',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions'),
        ),
        migrations.CreateModel(
            name='TrainerCertificates',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('image_url', models.CharField(max_length=80)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='StatusHistory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('usr_stat_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appsrc.UserStatuses')),
            ],
        ),
        migrations.CreateModel(
            name='EventsSubscribers',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appsrc.Events')),
                ('participant_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='events',
            name='owner_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='CoursesSubscribers',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('completed', models.BooleanField()),
                ('feedback', models.TextField()),
                ('rate', models.IntegerField()),
                ('course_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appsrc.Courses')),
                ('participant_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='courses',
            name='owner_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Achievements',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_url', models.CharField(max_length=80)),
                ('name', models.CharField(max_length=20)),
                ('course_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appsrc.Courses')),
            ],
        ),

        migrations.RunPython(insertData),

    ]