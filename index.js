import dotenv from 'dotenv'
import { createHash, createHmac } from "crypto-browserify"
import express from 'express'
import cors from 'cors'
import connectDB from './src/db/connectDB.js';
const app = express();
dotenv.config()

const hmacKey=process.env.HMACKEY
const pid=process.env.PID

app.use(cors())


app.get('/api/sanu', (req, res) => {
  res.send(`${process.env.PID}`)
})



let ymd = '20241207'
const getHmac = (pid, ymd) => {
  console.log('pid---', pid);
  console.log('ymd---', ymd);
  const value = pid.toString().concat(ymd)
  var hmac = createHmac("sha256", hmacKey).update(value).digest("hex")
  return hmac.toString("base64")
}
console.log('hmac---', getHmac(pid,ymd))





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