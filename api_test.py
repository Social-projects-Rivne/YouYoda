from flask import Flask, escape, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

RESPONSE = [{'first_name': 'Roman',
            'last_name': 'RUSYN',
            'location': 'Rivne',
            'username': 'Rrr',
            'email': 'testemail@gn.com',
            'password': '6a',
            'about_me': 'about_me feild_from_Api',
            'i_like': 'i like field and much more',
            'birth_date': '13.05.1992',
            'phone_number': '0981234567'}]


@app.route('/test', methods=['GET', 'POST'])
def hello():
    if request.method == 'POST':
        print(request.form)
    else:
        return jsonify(RESPONSE)
