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
    User.objects.create(id=4, hide_my_data = False, first_name = 'Sonya', last_name = 'Alcock',
        location = 'Ukraine, Kyiv', username = 'Trainer1', password = '$2y$12$bmih513m88oXDBMyHCzWF.dpm8jo/sfO2IffgVxrSPgTsx6iJFXYm',
        email = 'trainer1@test.com', about_me = "Trainer1", birth_date = datetime.datetime.now(), phone_number = "0922221133",
        is_active = True, avatar_url = '', is_trainer = True, role_id = 1)
    User.objects.create(id=5, hide_my_data = False, first_name = 'Gordon', last_name = 'Mason',
        location = 'Ukraine, Lviv', username = 'Trainer2', password = '$2y$12$bmih513m88oXDBMyHCzWF.dpm8jo/sfO2IffgVxrSPgTsx6iJFXYm',
        email = 'trainer2@test.com', about_me = "", birth_date = datetime.datetime.now(), phone_number = "09233322211",
        is_active = True, avatar_url = '', is_trainer = True, role_id = 1)
    User.objects.create(id=6, hide_my_data = False, first_name = 'Aliya', last_name = 'Workman',
        location = 'Ukraine, Rivne', username = 'Trainer3', password = '$2y$12$bmih513m88oXDBMyHCzWF.dpm8jo/sfO2IffgVxrSPgTsx6iJFXYm',
        email = 'trainer3@test.com', about_me = "", birth_date = datetime.datetime.now(), phone_number = "0928885522",
        is_active = True, avatar_url = '', is_trainer = True, role_id = 1)
    User.objects.create(id=7, hide_my_data = False, first_name = 'Kyran', last_name = 'Wills',
        location = 'Ukraine, Harkiv', username = 'Trainer4', password = '$2y$12$bmih513m88oXDBMyHCzWF.dpm8jo/sfO2IffgVxrSPgTsx6iJFXYm',
        email = 'trainer4@test.com', about_me = "", birth_date = datetime.datetime.now(), phone_number = "0928885533",
        is_active = True, avatar_url = '', is_trainer = True, role_id = 1)

    Categories = apps.get_model('appsrc', 'Categories')
    Categories.objects.create(
        id=1, name="other"
    )
    Categories.objects.create(
        id=2, name="sport"
    )
    Categories.objects.create(
        id=3, name="music"
    )
    Categories.objects.create(
        id=4, name="software"
    )

    Courses = apps.get_model('appsrc', 'Courses')
    Courses.objects.create(id=1, coursename="Lesson of swimming", owner_id=5, status="Open", description="Perfect for people who never swam",
        is_public=True, start_date=datetime.datetime.now(), duration=datetime.timedelta(days=20, hours=10), rate=8,
        members_limit=20, categories_id=2, location="Rivne, Ukraine", cover_url="")
    Courses.objects.create(id=2, coursename="Front-end", owner_id=5, status="In Progres", description="React Redux bla bla the best",
        is_public=True, start_date=datetime.datetime.now(), duration=datetime.timedelta(days=10, hours=10), rate=7,
        members_limit=40, categories_id=3, location="Kiev, Ukraine", cover_url="")
    Courses.objects.create(id=3, coursename="Course3", owner_id=4, status="Closed", description="Perfect for people who never swam",
        is_public=True, start_date=datetime.datetime.now(), duration=datetime.timedelta(days=3, hours=10), rate=9,
        members_limit=10, categories_id=4, location="Lviv, Ukraine", cover_url="")
    Courses.objects.create(id=4, coursename="Course4", owner_id=4, status="Scheduled", description="Perfect for people who never swam",
        is_public=False, start_date=datetime.datetime.now(), duration=datetime.timedelta(days=100, hours=10), rate=5,
        members_limit=60, categories_id=2, location="Harkiv, Ukraine", cover_url="")
    Courses.objects.create(id=5, coursename="Course5", owner_id=6, status="Scheduled", description="Perfect for people who never swam",
        is_public=False, start_date=datetime.datetime.now(), duration=datetime.timedelta(days=200, hours=10), rate=6,
        members_limit=50, categories_id=3, location="Lviv, Ukraine", cover_url="")
    Courses.objects.create(id=6, coursename="Course6", owner_id=7, status="Open", description="Perfect for people who never swam",
        is_public=False, start_date=datetime.datetime.now(), duration=datetime.timedelta(days=500, hours=10), rate=7,
        members_limit=12, categories_id=1, location="Rivne, Ukraine", cover_url="")
    Courses.objects.create(id=7, coursename="Course7", owner_id=4, status="Open", description="Perfect for people who never swam",
        is_public=False, start_date=datetime.datetime.now(), duration=datetime.timedelta(days=500, hours=10), rate=7,
        members_limit=12, categories_id=3, location="Rivne, Ukraine", cover_url="")
    Courses.objects.create(id=8, coursename="Course8", owner_id=4, status="Open", description="Perfect for people who never swam",
        is_public=False, start_date=datetime.datetime.now(), duration=datetime.timedelta(days=500, hours=10), rate=9,
        members_limit=12, categories_id=3, location="Rivne, Ukraine", cover_url="")

    Events = apps.get_model('appsrc', 'Events')
    Events.objects.create(id=1, name="Event-1", owner_id=3, description="Perfect for people who never swam",
        date=datetime.datetime.now(), categories_id=1, location="Kiev, Ukraine", cover_url="")
    Events.objects.create(id=2, name="Event-2", owner_id=4, description="Perfect for people who never swam",
        date=datetime.datetime.now(), categories_id=2, location="Rivne, Ukraine", cover_url="")
    Events.objects.create(id=3, name="Event-3", owner_id=5, description="Perfect for people who never swam",
        date=datetime.datetime.now(), categories_id=3, location="Lviv, Ukraine", cover_url="")
    Events.objects.create(id=4, name="Event-4", owner_id=6, description="Perfect for people who never swam",
        date=datetime.datetime.now(), categories_id=4, location="Rivne, Ukraine", cover_url="")
    Events.objects.create(id=5, name="Event-5", owner_id=3, description="Perfect for people who never swam",
        date=datetime.datetime.now(), categories_id=2, location="Rivne, Ukraine", cover_url="")

    CoursesSubscribers = apps.get_model('appsrc', 'CoursesSubscribers')
    CoursesSubscribers.objects.create(id=1, completed=False, feedback="feedback for course 1", rate=5, is_favourite=True,
        course_id_id=1, participant_id_id=8)
    CoursesSubscribers.objects.create(id=2, completed=True, feedback="feedback for course 2", rate=2, is_favourite=False,
        course_id_id=2, participant_id_id=8)
    CoursesSubscribers.objects.create(id=3, completed=False, feedback="feedback for course 3", rate=1, is_favourite=True,
        course_id_id=3, participant_id_id=8)
    CoursesSubscribers.objects.create(id=4, completed=True, feedback="feedback for course 4", rate=6, is_favourite=False,
        course_id_id=4, participant_id_id=8)
    CoursesSubscribers.objects.create(id=5, completed=False, feedback="feedback for course 5", rate=7, is_favourite=True,
        course_id_id=5, participant_id_id=8)
    CoursesSubscribers.objects.create(id=6, completed=True, feedback="feedback for course 6", rate=8, is_favourite=False,
        course_id_id=6, participant_id_id=8)
    CoursesSubscribers.objects.create(id=7, completed=False, feedback="feedback for course 7", rate=9, is_favourite=True,
        course_id_id=7, participant_id_id=8)
    CoursesSubscribers.objects.create(id=8, completed=True, feedback="feedback for course 8", rate=3, is_favourite=False,
        course_id_id=8, participant_id_id=8)


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
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('coursename', models.CharField(max_length=60)),
                ('status', models.CharField(max_length=10)),
                ('description', models.TextField(blank=True, null=True)),
                ('is_public', models.BooleanField()),
                ('start_date', models.DateTimeField()),
                ('duration', models.DurationField()),
                ('rate', models.IntegerField(default=0)),
                ('cost', models.IntegerField(default=0)),
                ('members_limit', models.IntegerField(blank=True, null=True)),
                ('location', models.TextField(blank=True, null=True)),
                ('cover_url', models.CharField(max_length=100)),
                ('categories', models.ForeignKey(default=1, on_delete=django.db.models.deletion.SET_DEFAULT, to='appsrc.Categories')),
            ],
        ),
        migrations.CreateModel(
            name='Events',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('name', models.CharField(max_length=60)),
                ('description', models.TextField()),
                ('date', models.DateTimeField()),
                ('location', models.TextField()),
                ('cover_url', models.CharField(max_length=80)),
                ('categories', models.ForeignKey(default=1, on_delete=django.db.models.deletion.SET_DEFAULT, to='appsrc.Categories')),
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
        migrations.CreateModel(
            name='CoursesSubscribers',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('completed', models.BooleanField()),
                ('is_favourite', models.BooleanField(default=False)),
                ('feedback', models.TextField()),
                ('rate', models.IntegerField()),
                ('course_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appsrc.Courses')),
                ('participant_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AlterField(
            model_name='coursessubscribers',
            name='course_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subscribed_course', to='appsrc.Courses'),
        ),
        migrations.AlterField(
            model_name='coursessubscribers',
            name='course_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subscribed_course', to='appsrc.Courses'),
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
