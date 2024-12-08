import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectDB from './src/db/connectDB.js';
import { hmacVal } from './src/utils/encryption.js';
const app = express();
dotenv.config()


app.use(cors())



app.get('/api/sanu', (req, res) => {
  res.send(`${process.env.PID}`)
})


console.log('hmacVal---',hmacVal);




connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    process.exit(1); 
  });