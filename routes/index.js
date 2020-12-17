//Authentication--------------------------------------------
var express = require("express");
var router = express.Router(); //changin all app.get by route.get
var passport = require("passport")


//importing all the sechma from model file
var Campground = require("../model/campground"),
    Comment = require("../model/comments"),
     User = require("../model/user")


router.get("/register",function(req,res){
	res.render("register" , {currentUser:req.user})
})

router.post("/register",function(req,res){
	console.log("hii reached")
	var newUser  = new User({username:req.body.username});
	
	
	User.register(newUser,req.body.password,function(err,user){
		console.log(newUser);
		console.log(req.body.password);
		if(err){
			console.log("smthing went wrong")
			 res.render("register")
		}
			
		passport.authenticate("local")(req,res,function(){
		res.redirect("/campground")
		})
	
	})
	
})

//login---------------------------------------------------------------------------
router.get("/login",function(req,res){
	res.render("login" , {currentUser:req.user});
})

//app.post("/login, middle_ware , call_back_func)
router.post("/login",passport.authenticate("local",{
	
	successRedirect : "/campground",
	failureRedirect : "/login"
}),
			function(req,res){
	
})

//logout
router.get("/logout",function(req,res){
		req.logout();
	res.redirect("/campground")
		})



//is logedin?  function
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.redirect("/login")
	}
}

module.exports = router;