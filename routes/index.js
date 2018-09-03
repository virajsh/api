var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
var Project = require('../models/projectModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//sign-in
router.post('/signin', function(req,res,next){
  
  var email=req.body.email;
  var password = req.body.password;
 
  User.find({"email":email }, function(err, user){
   

    if(err){
        console.log(JSON.stringify(err));
        res.json({code: 500, message: 'Something went wrong'});

    }
    else if (user && user.length> 0){

      console.log(user[0].password);
      console.log(password);

      if(user[0].password.trim() == password.trim()){
        res.json({code: 200, data: user});
        console.log(JSON.stringify(user));
      }else{
        res.json({code: 200, error: {msg: 'Invalid login'}});
      console.log(JSON.stringify(user));
      }
      
    }else{
      res.json({code: 200, error: {msg: 'Invalid login'}});
    console.log(JSON.stringify(user));
    }
  });
})

//sign-up
router.post('/signup', function (req, res, next) {
  var newUser = req.body
  var user = new User();
  user.name = newUser.name;
  user.email = newUser.email;
  user.password = (newUser.password);
  user.createAt = new Date();
  user.save(function (err, user) {
    console.log(JSON.stringify(user));

    if (err) res.send(err);
    else{
res.json({code:200,data: newUser});

    }
  });
}
);



module.exports = router;
