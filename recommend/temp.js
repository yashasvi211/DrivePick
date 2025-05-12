fetch('http://localhost:5000/predict', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    seat_capacity: "5",
    body_type: "Sedan",
    budget: "7-9L",
    priority1: "Comfort",
    priority2: "Safety",
    priority3: "Low Maintenance"
  })
})
.then(res => res.json())
.then(data => {
  console.log("Predicted car:", data);
})
.catch(err => console.error("Error:", err));
