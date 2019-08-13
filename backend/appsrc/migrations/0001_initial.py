
# Generated by Django 2.2.3 on 2019-08-13 12:08

from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    def insertData(apps, schema_editor):
        Roles = apps.get_model('appsrc', 'Roles')
        role = Roles(id = 1, name = 'user')
        role.save()
        role = Roles(id = 2, name = 'moderator')
        role.save()
        role = Roles(id = 3, name = 'admin')
        role.save()

        User = apps.get_model('appsrc', 'User')
        user = User(id=1, hide_my_data = True, first_name = 'Yoda', last_name = 'Rivensky', 
            location = 'Ukraine, Rivne', username = 'Yoda-admin', 
            email = 'youyoda.academy@gmail.com', about_me = "", birth_date = datetime.datetime.now(), phone_number = "", 
            avatar_url = '', is_trainer = True, role_id = Roles.objects.get(id=3, name='admin'))
        user.set_password('admin1111')
        user.save()
        user = User(id=2, hide_my_data = True, first_name = 'Yoda', last_name = 'Rivensky', 
            location = 'Ukraine, Rivne', username = 'Yoda-moderator', 
            email = 'test@test.com', about_me = "", birth_date = datetime.datetime.now(), phone_number = "", 
            avatar_url = '', is_trainer = True, role_id = Roles.objects.get(id=2, name='moderator'))
        user.set_password('moderator1111')
        user.save()
        user = User(id=3, hide_my_data = False, first_name = 'Yoda', last_name = 'Rivensky', 
            location = 'Ukraine, Rivne', username = 'Yoda-user', 
            email = 'test1@test.com', about_me = "", birth_date = datetime.datetime.now(), phone_number = "", 
            avatar_url = '', is_trainer = False, role_id = Roles.objects.get(id=1, name='user'))
        user.set_password('user1111')
        user.save()

    operations = [
        migrations.CreateModel(
            name='YouYodaUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('hide_my_data', models.BooleanField(default=False)),
                ('first_name', models.CharField(blank=True, max_length=20, null=True)),
                ('last_name', models.CharField(blank=True, max_length=20, null=True)),
                ('location', models.TextField(blank=True, null=True)),
                ('username', models.CharField(max_length=20, unique=True)),
                ('password', models.CharField(max_length=80)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('about_me', models.TextField(blank=True, null=True)),
                ('birth_date', models.DateField(blank=True, null=True)),
                ('phone_number', models.CharField(blank=True, max_length=9, null=True)),
                ('avatar_url', models.CharField(blank=True, max_length=80, null=True)),
                ('is_trainer', models.BooleanField()),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
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
                ('owner_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
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
                ('owner_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Roles',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='UserStatuses',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(max_length=40)),
            ],
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
                ('feedback', models.TextField()),
                ('rate', models.IntegerField()),
                ('course_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appsrc.Courses')),
                ('participant_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
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
        migrations.AddField(
            model_name='youyodauser',
            name='role_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='appsrc.Roles'),
        ),
        migrations.AddField(
            model_name='youyodauser',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions'),
        ),
        migrations.RunPython(insertData),
    ]
