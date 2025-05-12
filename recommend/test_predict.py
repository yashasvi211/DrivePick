import subprocess
import json

input_data = {
    "seat_capacity": "5",
    "body_type": "Sedan",
    "budget": "12L+",
    "priority1": "Safety",
    "priority2": "Mileage",
    "priority3": "Low Maintenance"
}

json_input = json.dumps(input_data)

subprocess.run(["python", "predict.py", json_input])
