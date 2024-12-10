from flask import Flask, request, jsonify
from datetime import datetime
from flask_cors import CORS  

app = Flask(__name__)
CORS(app) 

temperature = 0
humidity = 0
time = "1/1/1"

@app.route('/send_temperature', methods=['POST'])
def send_temperature():
    global temperature,humidity,time
    
    try:
        data = request.get_json()

        temperature = data.get('temperature')
        humidity = data.get('humidity')
        current_time = datetime.now()

        time = current_time.strftime("%H.%M/%d/%m")

        if temperature is None or humidity is None:
            return jsonify({'error': 'Missing temperature or humidity data'}), 400

        print(f"Received data - Temperature: {temperature}°C, Humidity: {humidity}%")

        return jsonify({
            'message': 'Data received successfully',
            'temperature': temperature,
            'humidity': humidity,
            'time': time,
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route("/get_temperature", methods=['GET'])
def get_temperature():
    return jsonify({
        "temperature": temperature,
        "humidity": humidity,
        "lastTimeMeasured": time,
    })

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
