FROM python:3
WORKDIR /backend
ADD requirements.txt ./
ADD manage.py ./
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
