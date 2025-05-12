const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const app = express();
app.use(cors());
app.use(bodyParser.json());

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
