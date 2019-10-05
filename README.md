# YouYoda
#### **Social project for life activity: training, communication and planning.**

* Frontend: React >=16.9.0
* Backend: Django 2.2.3
* Database: MariaDB latest version
* Cache: Redis latest version

* Frontend host in the configuration: localhost:3001
* Backend host: localhost:8000
* MariaDB uses port 3306

### Requirements
* Python 3.7
* Node 10.15
* Docker
* Docker Compose

### Installation using Docker Compose with Gunicorn

    docker-compose build
    docker-compose up

If the database is empty, you have to run migrations from the project folder:

    docker-compose run back python3 manage.py makemigrations
    docker-compose run back python3 manage.py migrate

If some new modules is not installed in the folder Node modules, you have to install them:

    npm install module-name

For installing modules for backend:

    pip install module-name