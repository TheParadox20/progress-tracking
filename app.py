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

@app.route("/retrive")
def retrive():
    report = []
    wards = cur.execute(f"SELECT DISTINCT ward from Progress").fetchall()
    # wards = cur.execute(f"SELECT DISTINCT ward from Progress").fetchall()[0][0].split(',')
    for ward in wards:
        verified,scanned,uploaded = 0,0,0
        for update in cur.execute(f"SELECT verified,scanned,uploads FROM Progress WHERE ward=='{ward[0]}'"):
            uploaded+=update[2]
            scanned+=update[1]
            verified+=update[0]
        report.append(dict(
            name = ward,
            verified = verified,
            scanned = scanned,
            uploaded = uploaded,
        ))
    return {"report":report}

#CREATE TABLE Progress (name varchar, ward char, verified int, scanned int, uploads int, comments varchar, time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL);
@app.route("/update")
def update():
    data = request.args
    cur.execute(f"INSERT INTO Progress (name, ward, verified, scanned,uploads,comments) VALUES ('{data.get('name')}','{data.get('ward')}','{data.get('verified')}','{data.get('scanned')}','{data.get('upload')}','{data.get('comments')}')")
    con.commit()
    return {"ACK":"OK"}