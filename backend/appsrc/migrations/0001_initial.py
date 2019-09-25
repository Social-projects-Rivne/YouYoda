import datetime
import django.contrib.auth.models
import django.db.models.deletion
import django.utils.timezone

from django.conf import settings
from django.db import migrations, models

from ..data_for_testing import *


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
        is_active = True, avatar_url = '/media/Trainer.jpg', is_trainer = True, role_id = 1)
    User.objects.create(id=5, hide_my_data = False, first_name = 'Gordon', last_name = 'Mason',
        location = 'Ukraine, Lviv', username = 'Trainer2', password = '$2y$12$bmih513m88oXDBMyHCzWF.dpm8jo/sfO2IffgVxrSPgTsx6iJFXYm',
        email = 'trainer2@test.com', about_me = "", birth_date = datetime.datetime.now(), phone_number = "09233322211",
        is_active = True, avatar_url = '/media/Trainer-1.jpg', is_trainer = True, role_id = 1)
    User.objects.create(id=6, hide_my_data = False, first_name = 'Aliya', last_name = 'Workman',
        location = 'Ukraine, Rivne', username = 'Trainer3', password = '$2y$12$bmih513m88oXDBMyHCzWF.dpm8jo/sfO2IffgVxrSPgTsx6iJFXYm',
        email = 'trainer3@test.com', about_me = "", birth_date = datetime.datetime.now(), phone_number = "0928885522",
        is_active = True, avatar_url = '/media/Trainer-2.jpg', is_trainer = True, role_id = 1)
    User.objects.create(id=7, hide_my_data = False, first_name = 'Kyran', last_name = 'Wills',
        location = 'Ukraine, Harkiv', username = 'Trainer4', password = '$2y$12$bmih513m88oXDBMyHCzWF.dpm8jo/sfO2IffgVxrSPgTsx6iJFXYm',
        email = 'trainer4@test.com', about_me = "", birth_date = datetime.datetime.now(), phone_number = "0928885533",
        is_active = True, avatar_url = '/media/Trainer-3.jpg', is_trainer = True, role_id = 1)

    Categories = apps.get_model('appsrc', 'Categories')
    Categories.objects.create(
        id=1, name="Other"
    )
    Categories.objects.create(
        id=2, name="Sport"
    )
    Categories.objects.create(
        id=3, name="Music"
    )
    Categories.objects.create(
        id=4, name="Software"
    )

    Courses = apps.get_model('appsrc', 'Courses')
    Courses.objects.create(id=1, coursename="Course1", owner_id=5, status="Open", description= description1,
        is_public=True, start_date=1569936600, duration=datetime.timedelta(hours=2), rate=8,
        members_limit=20, categories_id=2, location="Rivne, Ukraine", cover_url="/media/library-863148_1920.jpg", cost=0)
    Courses.objects.create(id=2, coursename="Course2", owner_id=5, status="In Progress", description= description2,
        is_public=True, start_date=1569936600, duration=datetime.timedelta(hours=1), rate=7,
        members_limit=40, categories_id=3, location="Kiev, Ukraine", cover_url="/media/beautiful-crowd-cute-2869374.jpg", cost=0.5)
    Courses.objects.create(id=3, coursename="Course3", owner_id=4, status="Closed", description= description3,
        is_public=True, start_date=1569936600, duration=datetime.timedelta(hours=4), rate=9,
        members_limit=10, categories_id=4, location="Lviv, Ukraine", cover_url="/media/geometry-1023846_1920.jpg", cost=10)
    Courses.objects.create(id=4, coursename="Course4", owner_id=4, status="Scheduled", description= description4,
        is_public=False, start_date=1569936600, duration=datetime.timedelta(hours=2), rate=5,
        members_limit=60, categories_id=2, location="Harkiv, Ukraine", cover_url="/media/hit-1407826_1920.jpg", cost=20)
    Courses.objects.create(id=5, coursename="Course5", owner_id=6, status="Scheduled", description= description5,
        is_public=False, start_date=1569936600, duration=datetime.timedelta(hours=3), rate=6,
        members_limit=50, categories_id=3, location="Lviv, Ukraine", cover_url="/media/car-racing-4394450_1920.jpg", cost=30)
    Courses.objects.create(id=6, coursename="Course6", owner_id=7, status="Open", description= description6,
        is_public=False, start_date=1569936600, duration=datetime.timedelta(hours=2), rate=7,
        members_limit=12, categories_id=1, location="Rivne, Ukraine", cover_url="/media/adults-chef-cook-2696064.jpg", cost=20)
    Courses.objects.create(id=7, coursename="Course7", owner_id=4, status="Open", description= description7,
        is_public=False, start_date=1569936600, duration=datetime.timedelta(hours=2), rate=7,
        members_limit=12, categories_id=3, location="Rivne, Ukraine", cover_url="/media/girl-1561989_1920.jpg", cost=6)
    Courses.objects.create(id=8, coursename="Course8", owner_id=4, status="Open", description= description8,
        is_public=False, start_date=1569936600, duration=datetime.timedelta(hours=2), rate=9,
        members_limit=12, categories_id=3, location="Rivne, Ukraine", cover_url="/media/bake-baked-bakery-2872882.jpg", cost=100)

    Events = apps.get_model('appsrc', 'Events')
    Events.objects.create(id=1, name="Event-1", owner_id=3, description= description9,
        date=1570800600, categories_id=1, location="Kiev, Ukraine", cover_url="/media/softball-372979_1920.jpg")
    Events.objects.create(id=2, name="Event-2", owner_id=4, description= description10,
        date=1570887000, categories_id=2, location="Rivne, Ukraine", cover_url="/media/art-artistic-color-2777671.jpg")
    Events.objects.create(id=3, name="Event-3", owner_id=5, description= description11,
        date=1570973400, categories_id=3, location="Lviv, Ukraine", cover_url="/media/stingray-4392776_1920.jpg")
    Events.objects.create(id=4, name="Event-4", owner_id=6, description= description12,
        date=1571059800, categories_id=4, location="Rivne, Ukraine", cover_url="/media/crossfit-534615_1920.jpg")
    Events.objects.create(id=5, name="Event-5", owner_id=3, description= description13,
        date=1571146200, categories_id=2, location="Rivne, Ukraine", cover_url="/media/hot-air-balloons-4381674_1920.jpg")

    CourseSchedule = apps.get_model('appsrc', 'CourseSchedule')
    CourseSchedule.objects.create(id=1, course_id=1, date=1570800600)
    CourseSchedule.objects.create(id=2, course_id=1, date=1570887000)
    CourseSchedule.objects.create(id=3, course_id=1, date=1570973400)
    CourseSchedule.objects.create(id=4, course_id=1, date=1571059800)
    CourseSchedule.objects.create(id=5, course_id=1, date=1571146200)
    CourseSchedule.objects.create(id=7, course_id=1, date=1571491800)
    CourseSchedule.objects.create(id=8, course_id=1, date=1569936600)
    CourseSchedule.objects.create(id=9, course_id=1, date=1570109400)
    CourseSchedule.objects.create(id=10, course_id=1, date=1570282200)
    CourseSchedule.objects.create(id=11, course_id=1, date=1570368600)
    CourseSchedule.objects.create(id=12, course_id=1, date=1570455000)
    CourseSchedule.objects.create(id=13, course_id=1, date=1572445800)
    CourseSchedule.objects.create(id=14, course_id=2, date=1570800600)
    CourseSchedule.objects.create(id=15, course_id=2, date=1570887000)
    CourseSchedule.objects.create(id=16, course_id=2, date=1570973400)
    CourseSchedule.objects.create(id=17, course_id=2, date=1571059800)
    CourseSchedule.objects.create(id=18, course_id=2, date=1571146200)
    CourseSchedule.objects.create(id=19, course_id=2, date=1571491800)
    CourseSchedule.objects.create(id=20, course_id=2, date=1569936600)
    CourseSchedule.objects.create(id=21, course_id=2, date=1570109400)
    CourseSchedule.objects.create(id=22, course_id=2, date=1570282200)
    CourseSchedule.objects.create(id=23, course_id=2, date=1570368600)
    CourseSchedule.objects.create(id=24, course_id=2, date=1570455000)
    CourseSchedule.objects.create(id=25, course_id=2, date=1572445800)
    CourseSchedule.objects.create(id=26, course_id=3, date=1570800600)
    CourseSchedule.objects.create(id=27, course_id=3, date=1570887000)
    CourseSchedule.objects.create(id=28, course_id=3, date=1570973400)
    CourseSchedule.objects.create(id=29, course_id=3, date=1571059800)
    CourseSchedule.objects.create(id=30, course_id=3, date=1571146200)
    CourseSchedule.objects.create(id=31, course_id=3, date=1571491800)
    CourseSchedule.objects.create(id=32, course_id=3, date=1569936600)
    CourseSchedule.objects.create(id=33, course_id=3, date=1570109400)
    CourseSchedule.objects.create(id=34, course_id=3, date=1570282200)
    CourseSchedule.objects.create(id=35, course_id=3, date=1570368600)
    CourseSchedule.objects.create(id=36, course_id=3, date=1570455000)
    CourseSchedule.objects.create(id=37, course_id=3, date=1572445800)
    CourseSchedule.objects.create(id=38, course_id=4, date=1570800600)
    CourseSchedule.objects.create(id=39, course_id=4, date=1570887000)
    CourseSchedule.objects.create(id=40, course_id=4, date=1570973400)
    CourseSchedule.objects.create(id=41, course_id=4, date=1571059800)
    CourseSchedule.objects.create(id=42, course_id=4, date=1571146200)
    CourseSchedule.objects.create(id=43, course_id=4, date=1571491800)
    CourseSchedule.objects.create(id=44, course_id=4, date=1569936600)
    CourseSchedule.objects.create(id=45, course_id=4, date=1570109400)
    CourseSchedule.objects.create(id=46, course_id=4, date=1570282200)
    CourseSchedule.objects.create(id=47, course_id=4, date=1570368600)
    CourseSchedule.objects.create(id=48, course_id=4, date=1570455000)
    CourseSchedule.objects.create(id=49, course_id=4, date=1572445800)
    CourseSchedule.objects.create(id=6, course_id=5, date=1570800600)
    CourseSchedule.objects.create(id=50, course_id=5, date=1570887000)
    CourseSchedule.objects.create(id=51, course_id=5, date=1570973400)
    CourseSchedule.objects.create(id=52, course_id=5, date=1571059800)
    CourseSchedule.objects.create(id=53, course_id=5, date=1571146200)
    CourseSchedule.objects.create(id=54, course_id=5, date=1571491800)
    CourseSchedule.objects.create(id=55, course_id=5, date=1569936600)
    CourseSchedule.objects.create(id=56, course_id=5, date=1570109400)
    CourseSchedule.objects.create(id=57, course_id=5, date=1570282200)
    CourseSchedule.objects.create(id=58, course_id=5, date=1570368600)
    CourseSchedule.objects.create(id=59, course_id=5, date=1570455000)
    CourseSchedule.objects.create(id=60, course_id=5, date=1572445800)
    CourseSchedule.objects.create(id=61, course_id=6, date=1570800600)
    CourseSchedule.objects.create(id=62, course_id=6, date=1570887000)
    CourseSchedule.objects.create(id=63, course_id=6, date=1570973400)
    CourseSchedule.objects.create(id=64, course_id=6, date=1571059800)
    CourseSchedule.objects.create(id=65, course_id=6, date=1571146200)
    CourseSchedule.objects.create(id=66, course_id=6, date=1571491800)
    CourseSchedule.objects.create(id=67, course_id=6, date=1569936600)
    CourseSchedule.objects.create(id=68, course_id=6, date=1570109400)
    CourseSchedule.objects.create(id=69, course_id=6, date=1570282200)
    CourseSchedule.objects.create(id=70, course_id=6, date=1570368600)
    CourseSchedule.objects.create(id=71, course_id=6, date=1570455000)
    CourseSchedule.objects.create(id=72, course_id=6, date=1572445800)
    CourseSchedule.objects.create(id=73, course_id=7, date=1570800600)
    CourseSchedule.objects.create(id=74, course_id=7, date=1570887000)
    CourseSchedule.objects.create(id=75, course_id=7, date=1570973400)
    CourseSchedule.objects.create(id=76, course_id=7, date=1571059800)
    CourseSchedule.objects.create(id=77, course_id=7, date=1571146200)
    CourseSchedule.objects.create(id=78, course_id=7, date=1571491800)
    CourseSchedule.objects.create(id=79, course_id=7, date=1569936600)
    CourseSchedule.objects.create(id=80, course_id=7, date=1570109400)
    CourseSchedule.objects.create(id=81, course_id=7, date=1570282200)
    CourseSchedule.objects.create(id=82, course_id=7, date=1570368600)
    CourseSchedule.objects.create(id=83, course_id=7, date=1570455000)
    CourseSchedule.objects.create(id=84, course_id=7, date=1572445800)
    CourseSchedule.objects.create(id=85, course_id=8, date=1570800600)
    CourseSchedule.objects.create(id=86, course_id=8, date=1570887000)
    CourseSchedule.objects.create(id=87, course_id=8, date=1570973400)
    CourseSchedule.objects.create(id=88, course_id=8, date=1571059800)
    CourseSchedule.objects.create(id=89, course_id=8, date=1571146200)
    CourseSchedule.objects.create(id=90, course_id=8, date=1571491800)
    CourseSchedule.objects.create(id=91, course_id=8, date=1569936600)
    CourseSchedule.objects.create(id=92, course_id=8, date=1570109400)
    CourseSchedule.objects.create(id=93, course_id=8, date=1570282200)
    CourseSchedule.objects.create(id=94, course_id=8, date=1570368600)
    CourseSchedule.objects.create(id=95, course_id=8, date=1570455000)
    CourseSchedule.objects.create(id=96, course_id=8, date=1572445800)

    CoursesSubscribers = apps.get_model('appsrc', 'CoursesSubscribers')
    CoursesSubscribers.objects.create(id=1, completed=False, rate=5, is_favourite=True,
        course_id=1, participant_id=1)
    CoursesSubscribers.objects.create(id=2, completed=True, rate=2, is_favourite=True,
        course_id=2, participant_id=1)
    CoursesSubscribers.objects.create(id=3, completed=False, rate=1, is_favourite=False,
        course_id=3, participant_id=1)
    CoursesSubscribers.objects.create(id=4, completed=True, rate=6, is_favourite=True,
        course_id=4, participant_id=1)

    EventsSubscribers = apps.get_model('appsrc', 'EventsSubscribers')
    EventsSubscribers.objects.create(
        id=1, participant_id=1, event_id=1, completed=True
    )
    EventsSubscribers.objects.create(
        id=2, participant_id=1, event_id=2, completed=False
    )
    EventsSubscribers.objects.create(
        id=3, participant_id=1, event_id=3, completed=True
    )
    EventsSubscribers.objects.create(
        id=4, participant_id=1, event_id=4, completed=False
    )
    EventsSubscribers.objects.create(
        id=5, participant_id=1, event_id=5, completed=True
    )

    Achievements = apps.get_model('appsrc', 'Achievements')
    Achievements.objects.create(
        id=1, course_id=1, image_url="/media/achievement.png", name='Achievement 1'
    )
    Achievements.objects.create(
        id=2, course_id=2, image_url="/media/achievement.png", name='Achievement 2'
    )
    Achievements.objects.create(
        id=3, course_id=7, image_url="/media/achievement.png", name='Achievement 3'
    )
    Achievements.objects.create(
        id=4, course_id=3, image_url="/media/achievement.png", name='Achievement 4'
    )
    Achievements.objects.create(
        id=5, course_id=4, image_url="/media/achievement.png", name='Achievement 5'
    )
    Achievements.objects.create(
        id=6, course_id=5, image_url="/media/achievement.png", name='Achievement 6'
    )
    Achievements.objects.create(
        id=7, course_id=6, image_url="/media/achievement.png", name='Achievement 7'
    )

    UsersAchievements = apps.get_model('appsrc', 'UsersAchievements')
    UsersAchievements.objects.create(
        id=1, participant_id=1, achievement_id=1
    )
    UsersAchievements.objects.create(
        id=2, participant_id=1, achievement_id=2
    )
    UsersAchievements.objects.create(
        id=3, participant_id=1, achievement_id=3
    )
    UsersAchievements.objects.create(
        id=4, participant_id=1, achievement_id=4
    )
    UsersAchievements.objects.create(
        id=5, participant_id=1, achievement_id=5
    )
    UsersAchievements.objects.create(
        id=6, participant_id=1, achievement_id=6
    )
    UsersAchievements.objects.create(
        id=7, participant_id=1, achievement_id=7
    )



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
                ('avatar_url', models.CharField(blank=True, max_length=255, null=True)),
                ('is_trainer', models.BooleanField(default=False)),
                ('role', models.ForeignKey(default=1, on_delete=django.db.models.deletion.SET_DEFAULT, related_name='owner', to='appsrc.Roles')),
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
            name='UserRequests',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('status_code', models.CharField(max_length=3)),
                ('comment', models.TextField(blank=True, null=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
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
                ('status', models.CharField(max_length=50)),
                ('description', models.TextField(blank=True, null=True)),
                ('is_public', models.BooleanField()),
                ('start_date', models.IntegerField()),
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
                ('date', models.IntegerField()),
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
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appsrc.Events')),
                ('participant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('completed', models.BooleanField(default=False)),
            ],
        ),
        migrations.AlterField(
            model_name='eventssubscribers',
            name='event',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subscribed_event', to='appsrc.Events'),
        ),
        migrations.CreateModel(
            name='CoursesSubscribers',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('completed', models.BooleanField(default=False)),
                ('is_favourite', models.BooleanField(default=False)),
                ('rate', models.IntegerField(default=0)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appsrc.Courses')),
                ('participant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AlterField(
            model_name='coursessubscribers',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subscribed_course', to='appsrc.Courses'),
        ),
        migrations.CreateModel(
            name='Achievements',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_url', models.CharField(max_length=80, blank=False)),
                ('name', models.CharField(max_length=20)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appsrc.Courses')),
            ],
        ),
        migrations.CreateModel(
            name='UsersAchievements',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('participant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('achievement', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,  related_name='user_achievements', to='appsrc.Achievements')),
            ],
        ),
        migrations.CreateModel(
            name='CoursesComments',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('comment', models.TextField(blank=True, null=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_details', to=settings.AUTH_USER_MODEL)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appsrc.Courses'))
            ],
        ),
        migrations.CreateModel(
            name='EventsComments',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('comment', models.TextField(blank=True, null=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appsrc.Events'))
            ],
        ),
        migrations.CreateModel(
            name='CourseSchedule',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.IntegerField()),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='course_schedule', to='appsrc.Courses')),
            ],
        ),
        migrations.CreateModel(
            name='PDPNotes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=60)),
                ('description', models.TextField(blank=True, null=True)),
                ('start', models.IntegerField()),
                ('end', models.IntegerField()),
                ('cover_url', models.TextField(blank=True, null=True)),
                ('status', models.CharField(max_length=50)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),

        migrations.RunPython(insertData),

    ]
