const express = require('express');
const cors = require('cors');
const UpdateRedisFixedWindow = require('./controller/UpdateRedisFixedWindow');
require('dotenv').config();
const apiRoute = require('./router/api');
const app = express();

app.use(cors());
app.use(express.json());

// UPDATE REDIS DATA AT EVERY ONE MINUTE INTERVAL 
setInterval(UpdateRedisFixedWindow, 60 * 1000);

app.use('/r',apiRoute);

const port = process.env.PORT || 8001;

app.listen(port,() =>{
    console.log(`Server is running at ${port}`);
});
