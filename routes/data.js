var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/data.json', function(req, res) {
    fs.readFile(__dirname + '/../data/data.json', function(err, data) {
       if(!err) {
           res.json(JSON.parse(data));
       } else {
           console.log(err);
       }
    });
});

module.exports = router;