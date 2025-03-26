import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './utils/db.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/dashboard/categoryRoutes.js';

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(
  cors({
    origin: [process.env.BASE_URL],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', authRoutes);
app.use('/api', categoryRoutes);

app.get('', (req, res) => {
  res.send('Hello From server!!');
});
app.listen(port, () => console.log(`Server is running on ${port}`));
