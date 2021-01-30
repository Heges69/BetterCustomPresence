const express = require('express');
const router = express.Router();
const client = require('discord-rich-presence')(require('../config/conf.json').clientId);

router.use(express.json());
router.post('/', (req, res) => {
    let data = req.body;
    console.log(data);
    let time = undefined;
    if(data.instance){
        time = Date.now();
    }
    client.updatePresence({
        state: data.state,
        details: data.details,
        largeImageKey: data.largeimagekey,
        startTimestamp: time,
    })
    res.sendStatus(200);
})
module.exports = router;