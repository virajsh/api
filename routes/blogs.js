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

/* Create blogs. */
router.post('/', function(req, res, next) {
  var blog = req.body;
  
  var blogModel = new Blog();
  blogModel.name = blog.name;
  blogModel.alias = urlify(blog.name); 
  blogModel.githubUrl = blog.githubUrl;
  blogModel.image = blog.image;
  blogModel.description = blog.description;
  blogModel.tags = [];

  // var tags = project.tags.trim();
  // tags = tags.split(',');
  // for(var i=0; i<tags.length; i++){
  //     projectModel.tags.push({'name':tags[i], 'class': 'info' });
  // }

  blogModel.imageSliders = blog.imageSliders;
  blogModel.relatedProjects = blog.relatedProjects;
  blogModel.createAt = new Date();
  blogModel.save(function(err, blog){
      console.log(JSON.stringify(blog));
      if(err){
        res.json({code: 500, message: 'Something went wrong'});
      }else{
        res.json({code: 200, data: blog}); 
      }
  });
});

/* update blog. */
router.put('/:blogAlias', function(req, res, next) {
  var bObject = req.body;
var blogAlias = req.params.blogAlias;
  Blog.findOne({'alias': blogAlias}, function(err, blog){
    if(err){
        callback(err, null);
    }else{

        console.log(JSON.stringify(blog));
        if(bObject.name){
            blog.name = bObject.name;
        }
        if(bObject.image){
            blog.image = bObject.image;
        }
        if(bObject.description){
            blog.description = bObject.description;
        }
        if(bObject.githubUrl){
            blog.githubUrl = bObject.githubUrl;
        }
        
        blog.save(function(err, blog){
           
            if(err){
              res.json({code: 500, message: 'Something went wrong'});
            }else{
              res.json({code: 200, data: blog}); 
            }
        });
    }
  });
});

/* delete blog. */
router.delete('/:blogAlias', function(req, res, next) {
  
  Blog.remove({'alias': req.params.blogAlias}, function(err, blog){
    if(err){
      res.json({code: 500, message: 'Something went wrong'});
    }else{
      res.json({code: 200, data: blog}); 
    }
  });
});

module.exports = router;
