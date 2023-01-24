import os
from flask import Flask, send_from_directory, request, send_file,make_response
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
    data = request.args
    report = []
    wards = cur.execute(f"SELECT DISTINCT {data.get('filter')} from Progress").fetchall()
    for ward in wards:
        verified,scanned,uploaded = 0,0,0
        for update in cur.execute(f"SELECT verified,scanned,uploads FROM Progress WHERE {data.get('filter')}=='{ward[0]}'"):
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

@app.route("/delete")
def delete():
    data = request.args
    cur.execute(f"DELETE FROM Progress WHERE {data.get('condition')}='{data.get('value')}'")
    con.commit()
    return {"ACK":"OK"}
def tocsv():
    f = open('report.csv','w')
    for row in cur.execute("SELECT * FROM Progress"):
        for column in row:
            f.write(str(column) if type(column)!='str' else column)
            f.write(',')
        f.write('\n')

@app.route("/download/<file_name>")
def getFile(file_name):
    tocsv()
    headers = {"Content-Disposition": "attachment; filename=%s" % file_name}
    with open(file_name, 'r') as f:
        body = f.read()
    return make_response((body, headers))

if __name__ == '__main__':
    app.run(debug=True, port=os.getenv("PORT", default=5000),host='0.0.0.0')