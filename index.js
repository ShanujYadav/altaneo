import { app } from './app.js'
import dotenv from 'dotenv'
import connectDB from './src/db/connectDB.js'

dotenv.config()

app.get('/api/hello', (req, res) => {
    res.status(200).send('Ha bhai');
});


connectDB()
.then(()=>{
    app.listen(process.env.PORT|| 5000,()=>{
        console.log(`Server is running at ${process.env.PORT}`);
   })
})

.catch((err)=>{
    console.log('Error=---',err)
})



// import dotenv from 'dotenv'
// import { createHash, createHmac } from "crypto-browserify"
// import express from 'express'
// import cors from 'cors'
// const app = express();
// dotenv.config()


// const hmacKey=process.env.HMACKEY
// const pid=process.env.PID


// app.use(cors())

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });


// app.get('/api/sanu', (req, res) => {
//   res.send(`${process.env.NAME}`)
// })


// const dummyData = [
//   {
//     id: 1,
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     phone: '123-456-7890',
//     message: 'Looking forward to working with you!',
//   },
//   {
//     id: 2,
//     name: 'Jane Smith',
//     email: 'jane.smith@example.com',
//     phone: '987-654-3210',
//     message: 'I am interested in your services.',
//   },
// ];


// let ymd = '20241207'

// const getHmac = (pid, ymd) => {
//   console.log('pid---', pid);
//   console.log('ymd---', ymd);
//   const value = pid.toString().concat(ymd)
//   var hmac = createHmac("sha256", hmacKey).update(value).digest("hex")
//   return hmac.toString("base64")
// }

// console.log('hmac---', getHmac(pid,ymd))


// app.get('/api/data', (req, res) => {
//   res.status(200).json(dummyData);
// })



// app.listen(process.env.PORT || 8000, () => {
//   console.log(`Server is running at ${process.env.PORT}`);
// })
