from flask import Flask , render_template , jsonify , request

app = Flask(__name__)

@app.route('/')
def index():
    return jsonify({'message': 'Hello World!'})

@app.route('/<name>')
def hello(name):
    return jsonify({'message': 'Hello %s!' % name})

if __name__ == '__main__':
    app.run(debug=True)