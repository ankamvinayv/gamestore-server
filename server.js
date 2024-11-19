const express = require('express')
const cors = require('cors')

const connectDB = require('./config/db')
const Users = require('./routes/UserRoute')
const Games = require('./routes/GameRoute')
const Orders = require('./routes/OrderRoute')
const Reviews = require('./routes/ReviewRoute')
const Auth = require('./routes/AuthRoute')
const Port = 5000
const app = express()
app.use(cors())
app.use(express.json())
connectDB();


app.use('/users',Users)
app.use('/games',Games)
app.use('/orders',Orders)
app.use('/reviews',Reviews)
app.use('/auth', Auth)
app.get('/', (req, res) => {
    res.status(200).json({message: "welcome"})
    res.send("Hello all, Welcome to MongoDB!");
});


app.listen(Port, () => {
   
    console.log(`Server is running in Port : ${Port}`)

})