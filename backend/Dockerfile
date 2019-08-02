FROM python:3
WORKDIR /backend
ADD requirements.txt ./
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
#CMD '/usr/bin/mysqladmin' -u root password 'root_password'
#CMD '/usr/bin/mysqladmin' -u root -h password 'root_password'
#CMD python3 manage.py makemigrations
#CMD python3 manage.py migrate
