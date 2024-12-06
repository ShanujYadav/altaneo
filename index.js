import dotenv from 'dotenv'
import express from 'express'
const app = express();


dotenv.config({
    path: '../env'
})

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.get('/api/sanu', (req, res) => {
    res.send(`${process.env.NAME}`)
})


app.get('/api/manu', (req, res) => {
    res.send('ho gya bhai !')
})



app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running at ${process.env.PORT}`);
})
