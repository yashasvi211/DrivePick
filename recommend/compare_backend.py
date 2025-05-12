from flask import Flask, request, jsonify
import openai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

openai.api_key = "YOUR_OPENAI_API_KEY"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    car1, car2 = data['cars']

    prompt = f"""Compare the following two cars and suggest which is best for different use cases (family, highway, city, performance):
    
Car 1:
Name: {car1['name']}
Seat Capacity: {car1['seat_capacity']}
Body Type: {car1['body_type']}
Budget: {car1['budget']}
Priorities: {car1['priority1']}, {car1['priority2']}, {car1['priority3']}

Car 2:
Name: {car2['name']}
Seat Capacity: {car2['seat_capacity']}
Body Type: {car2['body_type']}
Budget: {car2['budget']}
Priorities: {car2['priority1']}, {car2['priority2']}, {car2['priority3']}

Give a short and useful summary comparison.
"""

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
        summary = response['choices'][0]['message']['content']
        return jsonify({'summary': summary})
    except Exception as e:
        return jsonify({'summary': f'Error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
