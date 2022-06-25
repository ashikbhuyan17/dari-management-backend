const express = require('express');
const app = express();
var cors = require('cors')
// const env = require('dotenv');
// env.config()
// console.log(env.config());
require('dotenv').config();

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors())





//database
require('./config/dbConnect')();



//routes
const authRoutes = require('./src/routes/auth');
const authAdminRoutes = require('./src/routes/admin/auth');
const categoryRoutes = require('./src/routes/category');
const animalRoutes = require('./src/routes/animal');
const purchaseRoutes = require('./src/routes/purchase');


app.use('/api', authRoutes)
app.use('/api', authAdminRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/animal', animalRoutes)
app.use('/api/purchase', purchaseRoutes)





//port
port = process.env.PORT || 5000
// console.log(port);

// app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello000 World!'
    })
})


app.post('/data', (req, res) => {
    res.status(200).json({
        message: req.body
    })
})


app.listen(port, () => console.log(`Example app listening on port port! ${port}`))








