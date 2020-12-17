//==========================================================================================
//comments
//==========================================================================================


var express = require("express");
var router = express.Router(); //changin all app.get by route.get


//importing all the sechma from model file
var Campground = require("../model/campground.js"),
    Comment = require("../model/comments"),
     User = require("../model/user.js")


router.get("/campground/:id/comments/new",isLoggedIn, function(req,res){
	console.log(req.params.id);
	
	Campground.findOne({_id:req.params.id},function(err,campground){
		
	if(err){
		console.log("smthing went wrong!!!")
	}else{
	  res.render("comments/newcomment" , {campground:campground , currentUser:req.user})
	}
				 })
	})

router.post("/campground/:id/comments",function(req,res,err){
	var newcomment = req.body.cmt;
	var author = req.body.author;
	
	var cmtdata = {
		text:newcomment,
		author:author
	}

	Campground.findOne({_id:req.params.id},function(err,campground){
		if(err){
			console.log("went wrong!")
		}else{
			Comment.create(cmtdata,function(err,comtfound){
				if(err){
					console.log("comment not saved")
				}else{
					
					console.log(req.user.username)
					// comtfound.author.id = req.user._id
					// comtfound.author.user = req.user.username;
					// comtfound.save();
					
					
					campground.comments.push(comtfound);
					campground.save();
					
					res.redirect("/campground/" + campground._id)
				}
			})
		}
		
	})
	console.log(newcomment)
	
})

//is logedin?  function
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.redirect("/login")
	}
}

module.exports = router; //exporting all the router
