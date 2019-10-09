#! /bin/bash
python manage.py migrate

python manage.py shell -c \
	"from django.contrib.sites.models import Site; Site.objects.filter(domain='example.com').update(domain='localhost:3001', name='YouYoda')"
