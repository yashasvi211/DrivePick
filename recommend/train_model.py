import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier

# Load dataset (adjust the path to where your CSV file is located)
data = pd.read_csv('cars_dataset.csv')

# Encode categorical columns
le_seat = LabelEncoder()
le_body = LabelEncoder()
le_budget = LabelEncoder()
le_p1 = LabelEncoder()
le_p2 = LabelEncoder()
le_p3 = LabelEncoder()
le_car = LabelEncoder()

data['seat_capacity'] = le_seat.fit_transform(data['seat_capacity'])
data['body_type'] = le_body.fit_transform(data['body_type'])
data['budget'] = le_budget.fit_transform(data['budget'])
data['priority1'] = le_p1.fit_transform(data['priority1'])
data['priority2'] = le_p2.fit_transform(data['priority2'])
data['priority3'] = le_p3.fit_transform(data['priority3'])
data['car_name'] = le_car.fit_transform(data['car_name'])

# Prepare features and target
X = data[['seat_capacity', 'body_type', 'budget', 'priority1', 'priority2', 'priority3']]
y = data['car_name']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train RandomForest model
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# Save the model and label encoders for future use
joblib.dump(model, 'car_recommendation_model.pkl')
joblib.dump(le_seat, 'le_seat.pkl')
joblib.dump(le_body, 'le_body.pkl')
joblib.dump(le_budget, 'le_budget.pkl')
joblib.dump(le_p1, 'le_p1.pkl')
joblib.dump(le_p2, 'le_p2.pkl')
joblib.dump(le_p3, 'le_p3.pkl')
joblib.dump(le_car, 'le_car.pkl')
