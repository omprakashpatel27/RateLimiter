const express = require('express');
const FixedWindowSize = require('../controller/FixedWindowSize');
const route = express.Router();

route.post('/', async (req, res) =>{
    const clientData = req.body;
    const accessToServer = await FixedWindowSize(clientData.timeStamp);
    res.status(201).json({
        message: 'Post created successfully',
		data: accessToServer
    })
})

module.exports = route;