import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
import connectDB from './config/db.js';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get('/health-check', (req, res) => {
    res.send('Working..!');
});

import userRouter from "./routes/user.routes.js";
app.use('/users', userRouter);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});