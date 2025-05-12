import json
import joblib
import pandas as pd
import sys

# Load the trained model and label encoders
model = joblib.load('car_recommendation_model.pkl')
le_seat = joblib.load('le_seat.pkl')
le_body = joblib.load('le_body.pkl')
le_budget = joblib.load('le_budget.pkl')
le_p1 = joblib.load('le_p1.pkl')
le_p2 = joblib.load('le_p2.pkl')
le_p3 = joblib.load('le_p3.pkl')
le_car = joblib.load('le_car.pkl')

# Get input data
input_data = json.loads(sys.argv[1])
seat_capacity = input_data['seat_capacity']
body_type = input_data['body_type']
budget = input_data['budget']
priority1 = input_data['priority1']
priority2 = input_data['priority2']
priority3 = input_data['priority3']

# Encode input features
encoded_seat = le_seat.transform([seat_capacity])[0]
encoded_body = le_body.transform([body_type])[0]
encoded_budget = le_budget.transform([budget])[0]
encoded_p1 = le_p1.transform([priority1])[0]
encoded_p2 = le_p2.transform([priority2])[0]
encoded_p3 = le_p3.transform([priority3])[0]

# Create DataFrame for input
input_df = pd.DataFrame([[encoded_seat, encoded_body, encoded_budget, encoded_p1, encoded_p2, encoded_p3]],
                        columns=['seat_capacity', 'body_type', 'budget', 'priority1', 'priority2', 'priority3'])

# Make prediction
prediction = model.predict(input_df)

# Decode the car name
car_name = le_car.inverse_transform([prediction[0]])[0]

# Output the result
print(json.dumps({'car_name': car_name}))
