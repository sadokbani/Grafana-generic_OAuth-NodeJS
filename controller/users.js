const express = require("express");
const jwt = require('jsonwebtoken');
const User = require("../model/user");
const router = express.Router();

let user;
let token;


router.post("",  (req, res, next) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: User.hashPassword(req.body.password),
      role:req.body.role
    });
    user.save().then(createduser => {
      res.redirect(`${process.env.GRAFANA_URI}/login`);
    });
  }
);


router.post('/login/:state', function(req,res,next){

  let promise = User.findOne({email:req.body.email}).exec();
  promise.then(function(doc){    
    user=doc;
    if(doc) {
      if(doc.isValid(req.body.password)){
        let state=req.params.state;
        token = jwt.sign(user.toObject(),'secret', {expiresIn : '3h'});
        return res.cookie('token',token).redirect(`${process.env.GRAFANA_URI}/login/generic_oauth?state=${state}&code=cc536d98d27750394a87ab9d057016e636a8ac31`);
      } else {
        return res.status(501).json({message:' Invalid Credentials'});
      }
    }
    else {
      return res.status(501).json({message:'User email is not registered.'})
    }
  });
  promise.catch(function(err){
    return res.status(501).json({message:'Some internal error'});
  })
});


router.post('/token',(req,res)=>{
    res.json({
        "access_token":token
    })
});

router.get('/api/',(req,res)=>{
      res.status(200).json(user);
});




module.exports = router;