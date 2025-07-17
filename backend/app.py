from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)

# Allow Cross-Origin
CORS(app)

# Dump database contents to json.
@app.route('/api/data', methods=['GET'])
def dump_data():
    # DB connection and query.
    conn = sqlite3.connect('./mock.db')
    response = conn.execute("""
        SELECT * FROM data
    """).fetchall()
    conn.close()
    # For every entry, append to json response.
    json_response = []
    for id, title, description in response:
        json_entry = {
            'id': id,
            'title': title,
            'description': description,
        }
        json_response.append(json_entry)
    return jsonify({
        'success': True,
        'data': json_response,
        'count': len(json_response)
    })


if __name__ == "__main__":
    app.run(port=5055, debug=True)
