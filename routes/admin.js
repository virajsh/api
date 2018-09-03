var express = require('express');
var router = express.Router();
var Blog = require('../models/blogModel');
var Project = require('../models/projectModel');


function urlify(str) {
  var urlifyStr = str.trim().toLowerCase();
  urlifyStr = urlifyStr.replace(/ /g, '-');
  // handle for ? & - 
  return urlifyStr;
}
//create project
router.post('/create', function (req, res, next) {

  function urlify(str) {
    var urlifyStr = str.trim().toLowerCase();
    urlifyStr = urlifyStr.replace(/ /g, '-');
    // handle for ? & - 
    return urlifyStr;
  }
  var project = req.body;

  var projectModel = new Project();
  projectModel.name = project.name;
  projectModel.alias = urlify(project.name);
  projectModel.githubUrl = project.githubUrl;
  projectModel.image = project.image;
  projectModel.description = project.description;
  projectModel.tags = [];
  projectModel.imageSliders = project.imageSliders;
  projectModel.relatedProjects = project.relatedProjects;
  projectModel.createAt = new Date();
  projectModel.save(function (err, project) {
    console.log(JSON.stringify(projectModel));
    if (err) {
      res.json({ code: 500, message: 'Something went wrong' });
    } else {
      res.json({ code: 200, data: project });
    }
  });

});


//update project
router.post('/project/:projectAlias', function (req, res, next) {
  var pObject = req.body;
  if (pObject.name) {
    pObject.alias = urlify(pObject.name);
  };
  
  
  Project.update({ "alias": req.params.projectAlias }, pObject, function (err, project) {
    console.log(JSON.stringify(project));
    if (err) {
      res.json({ code: 500, message: 'Something went wrong' });
    } else {
      res.json({ code: 200, data: project });
    }
  });
});



/* delete project. */
router.delete('/:projectAlias', function (req, res, next) {

  Project.remove({ 'alias': req.params.projectAlias }, function (err, project) {
    if (err) {
      res.json({ code: 500, message: 'Something went wrong' });
    } else {
      res.json({ code: 200, data: project });
    }
  });
});





// get blog
router.get('/blogs', function (req, res, next) {
  Blog.find({}, function (err, blogs) {
    if (err) {

      res.json({ code: 500, message: 'Something went wrong' });
    } else if (blogs) {
      res.json({ code: 200, data: blogs });
    }
  });
});




//create blog
router.post('/createBlog', function (req, res, next) {
  console.log("cre route");

  function urlify(str) {
    var urlifyStr = str.trim().toLowerCase();
    urlifyStr = urlifyStr.replace(/ /g, '-');
    // handle for ? & - 
    return urlifyStr;
  }
  var blog = {}
  blog = req.body;
  console.log(JSON.stringify(req.body));
  var blogModel = new Blog();
  blogModel.name = blog.name;
  blogModel.alias = urlify(blog.name);
  blogModel.githubUrl = blog.githubUrl;
  blogModel.image = blog.image;
  blogModel.description = blog.description;
  blogModel.tags = [];
  blogModel.imageSliders = blog.imageSliders;
  blogModel.relatedBlogs = blog.relatedProjects;
  blogModel.createAt = new Date();
  blogModel.save(function (err, blog) {
    console.log(JSON.stringify(blogModel));
    if (err) {
      res.json({ code: 500, message: 'Something went wrong' });
    } else {
      res.json({ code: 200, data: blog });
    }
  });

});

//update blog

router.post('/blogs/:blogAlias', function (req, res, next) {
  var bObject = req.body;
  if (bObject.name) {
    bObject.alias = urlify(bObject.name);
  }
  
  Blog.update({ "alias": req.params.blogAlias }, bObject, function (err, blog) {
    console.log(JSON.stringify(blog));
    if (err) {
      res.json({ code: 500, message: 'Something went wrong' });
    } else {
      res.json({ code: 200, data: blog });
    }
  });
});

/* delete project. */
router.delete('/blogs/:blogAlias', function (req, res, next) {

  Blog.remove({ 'alias': req.params.blogAlias }, function (err, blog) {
    if (err) {
      res.json({ code: 500, message: 'Something went wrong' });
    } else {
      res.json({ code: 200, data: blog });
    }
  });
});

module.exports = router;