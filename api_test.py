from flask import Flask, escape, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

RESPONSE = {'first_name': '1',
            'last_name': '2',
            'location': 'Lviv',
            'username': '4',
            'email': 'rrr@gn.com',
            'password': '6a',
            'about_me': 'about_me feild_from_Api',
            'i_like': 'i like field',
            'birth_date': '9',
            'phone_number': '99999'}


@app.route('/test', methods=['GET', 'POST'])
def hello():
    if request.method == 'POST':
        print(request.form)
    else:
        return jsonify(RESPONSE)
