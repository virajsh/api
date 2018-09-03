var express = require('express');
var router = express.Router();
var Blog = require('../models/blogModel');



function urlify(str){
  var urlifyStr = str.trim().toLowerCase();
  urlifyStr = urlifyStr.replace(/ /g,'-');
  // handle for ? & - 
  return urlifyStr;
}

/* GET all blogs listing. */
router.get('/', function(req, res, next) {
  Blog.find({}, function(err, blogs){
    if(err){
        console.log(JSON.stringify(err));
        res.json({code: 500, message: 'Something went wrong'});
    }else if (blogs){
      res.json({code: 200, data: blogs});
    }
  });
});

/* GET blog by alias. */
router.get('/:blogAlias', function(req, res, next) {
  Blog.findOne({alias: req.params.blogAlias}, function(err, blog){
    console.log(JSON.stringify(blog));

    if(err){
        console.log(JSON.stringify(err));
        res.json({code: 500, message: 'Something went wrong'});
    }else if (blog){
      res.json({code: 200, data: blog});
    }
  });
});



module.exports = router;
