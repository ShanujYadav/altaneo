import dotenv from 'dotenv'
dotenv.config()

import { app } from './app.js'
import connectDB from './src/db/connectDB.js'
import { hmacVal } from './src/utils/encryption.js';


app.get('/api/hello', (req, res) => {
    res.status(200).send('Ha bhai',hmacVal);
})


console.log("index pid--",process.env.PID)

connectDB()
.then(()=>{
    app.listen(process.env.PORT|| 5000,()=>{
        console.log(`Server is running at ${process.env.PORT}`);
   })
})
.catch((err)=>{
    console.log('Error=---',err)
})