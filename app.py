import os
from flask import Flask, send_from_directory, request
from flask_cors import CORS
import sqlite3

con = sqlite3.connect('progress.db', check_same_thread=False)
cur = con.cursor()

app = Flask(__name__, static_folder='frontend/dist')

CORS(app)
# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route("/test")
def test():
    return {"test":"Hello World"}