const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();
const port = process.env.PORT;

// Middleware
app.use(
  cors({
    origin: [process.env.BASE_URL],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', require('./routes/authRoutes'));

app.get('', (req, res) => {
  res.send('Hello From server!!');
});
app.listen(port, () => console.log(`Server is running on ${port}`));
