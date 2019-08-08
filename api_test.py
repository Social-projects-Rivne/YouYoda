from flask import Flask, escape, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

RESPONSE = {'first_name': '1',
            'last_name': '2',
            'location': 'stateFromApi_test.py',
            'username': '4',
            'email': 'rrr@gn.com',
            'password': '6a',
            'about_me': '7_from_Api',
            'about_me1': 'Fuck_from_Api',
            'birth_date': '9',
            'phone_number': '99999'}


@app.route('/test', methods=['GET', 'POST'])
def hello():
    if request.method == 'POST':
        print(request.form)
    else:
        return jsonify(RESPONSE)
