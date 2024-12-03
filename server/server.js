import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDb from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';

// App Config
const PORT = process.env.PORT || 4000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
await connectDb();

// API routes
app.get('/', (req, res) => {
  res.send('Api is running');
});

app.use('/api/user', userRouter);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
