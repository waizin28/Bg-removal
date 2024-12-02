import express from 'express';
import 'dotenv/config';
import cors from 'cors';

// App Config
const PORT = process.env.PORT || 4000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.get('/', (req, res) => {
  res.send('Api is running');
});

app.listen(PORT, () => console.log(`Listening on port:${PORT}`));
