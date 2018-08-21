var express = require('express');
var router = express.Router();
var Blog = require('../models/blogModel');

router.get('/blogs', function(req, res, next) {
    Blog.find({}, function(err, blogs){
      if(err){
          console.log(JSON.stringify(err));
          res.json({code: 500, message: 'Something went wrong'});
      }else if (blogs){
        res.json({code: 200, data: blogs});
      }
    });
  });
module.exports = router;