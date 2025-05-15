const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const mysql = require('mysql2');
const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ MySQL Connection
const db = mysql.createConnection({
  // host: 'localhost',
  // user: 'root',
  // password: 'password',
  // database: 'car_catalog'
    host: 'mysql-340cd3c3-drivepick.d.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_sq1jwYkPokwi5bqpVSq',
  database: 'defaultdb',
  port:'14131',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL');
});
app.use(cors());
app.use(bodyParser.json());
app.get('/cars', (req, res) => {
  const query = `
    SELECT 
      c.car_id, c.name AS car_name, ct.name AS car_type, c.image_url, 
      c.engine_power, c.fuel_type, c.price_range, c.seating_capacity, 
      c.mileage, c.transmission, c.boot_space, c.safety,
      v.variant_id, v.name AS variant_name, v.fuel_type AS variant_fuel_type,
      v.transmission AS variant_transmission, v.price AS variant_price,
      v.features AS variant_features
    FROM cars c
    LEFT JOIN car_types ct ON c.type_id = ct.type_id
    LEFT JOIN variants v ON c.car_id = v.car_id
    ORDER BY c.car_id;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    const carMap = {};

    results.forEach(row => {
      const carId = row.car_id;
      if (!carMap[carId]) {
        carMap[carId] = {
          id: carId,
          name: row.car_name,
          type: row.car_type,
          image_url: row.image_url,
          engine_power: row.engine_power,
          fuel_type: row.fuel_type,
          price_range: row.price_range,
          seating_capacity: row.seating_capacity,
          mileage: row.mileage,
          transmission: row.transmission,
          boot_space: row.boot_space,
          safety: row.safety,
          variants: []
        };
      }

      if (row.variant_id) {
        carMap[carId].variants.push({
          name: row.variant_name,
          fuel_type: row.variant_fuel_type,
          transmission: row.variant_transmission,
          price: row.variant_price,
          features: row.variant_features
        });
      }
    });

    const cars = Object.values(carMap);
    res.json(cars);
  });
});

app.post('/predict', (req, res) => {
  const input = JSON.stringify(req.body);
  const python = spawn('python', ['predict.py', input]);

  let result = '';
  python.stdout.on('data', (data) => {
    result += data.toString();
  });

  python.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  python.on('close', (code) => {
    try {
      const prediction = JSON.parse(result);
      res.json(prediction);
    } catch (err) {
      res.status(500).json({ error: 'Failed to parse prediction' });
    }
  });
});

app.listen(5000, () => console.log('Server started on port 5000'));
