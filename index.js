import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
const app = express();


dotenv.config({
    path: '../env'
})

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.get('/api/sanu', (req, res) => {
    res.send(`${process.env.NAME}`)
})

const dummyData = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      message: 'Looking forward to working with you!',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '987-654-3210',
      message: 'I am interested in your services.',
    },
  ];
  

app.get('/api/data', (req, res) => {
    res.status(200).json(dummyData);
})



app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running at ${process.env.PORT}`);
})
