# YouYoda
#### **Social project for life activity: training, communication and planning.**

##[DEMO](https://youyoda-academy.herokuapp.com)

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

Install Docker and Docker Compose

    [Install Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

    [Install Docker Compose](https://docs.docker.com/compose/install/)

For project deployment  

    docker-compose build
    docker-compose up   

You have to run migrations database from the project folder:

    docker-compose run back python3 manage.py makemigrations
    docker-compose run back bash migrate.sh

If some new modules is not installed in the folder Node modules, you have to install them:

    npm install --save module-name

For installing modules for backend:

    pip install module-name

Install all required modules for backend:

    pip install --no-cache-dir -r requirements.txt

## Frontend

In the directory, you can run:

    npm start

Runs the app in the development mode.<br>
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

    npm test

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

    npm run build

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

    npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

    npm run build

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


## Usefull command for all occasions

Direct access to database

    docker exec -it youyoda_mariadb_1 bash
    mysql -p

Remove database

    docker-compose rm -v

Stop and remove all containers

    docker stop $(docker ps -aq)
    docker rm $(docker ps -aq)

Restart all containers

    docker-compose restart

Restart container

    docker-compose restart container_name


## Testing data

User credential data for different type of users

### Admin

    youyoda.academy@gmail.com
    password: 123456

### Moderator

    test@test.com
    password: 123456

### Trainer

    trainer1@test.com
    password: 123456

### User

    test1@test.com
    password: 123456
