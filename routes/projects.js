
var express = require('express');
var router = express.Router();
var Project = require('../models/projectModel');

/*

/projects               GET   (list all projects)
/projects/alias         GET   (Get by alias)
/projects               POST  (Create a new project)
/projects/alias         PUT   (Update the project)
/projects/alias         DELETE (remove a project)

*/

function urlify(str){
  var urlifyStr = str.trim().toLowerCase();
  urlifyStr = urlifyStr.replace(/ /g,'-');
  // handle for ? & - 
  return urlifyStr;
}

/* GET all projects listing. */
router.get('/', function(req, res, next) {
  Project.find({}, function(err, projects){
    

    if(err){
        console.log(JSON.stringify(err));
        res.json({code: 500, message: 'Something went wrong'});
    }else if (projects){
      res.json({code: 200, data: projects});
    }
  });
});

/* GET project by alias. */
router.get('/:projectAlias', function(req, res, next) {
  Project.findOne({alias: req.params.projectAlias}, function(err, projects){
    ;

    if(err){
        console.log(JSON.stringify(err));
        res.json({code: 500, message: 'Something went wrong'});
    }else if (projects){
      res.json({code: 200, data: projects});
    }
  });
});


//get project alias demo

router.get('/:projectAlias/demo', function(req, res, next) {
  Project.findOne({alias: req.params.projectAlias}, function(err, projects){
    

    if(err){
        console.log(JSON.stringify(err));
        res.json({code: 500, message: 'Something went wrong'});
    }else if (projects){
      res.json({code: 200, data: projects});
    }
  });
});






router.get('/blog', function (req, res, next) {
  res.render('admin/blog', { 
    layout: 'layout-admin', 
    title: 'Blog Admin',
    navBlog: true,
    blogs: getBlog()  
  });
  });

module.exports = router;



