
var express = require("express");
var router = express.Router(); //changin all app.get by route.get

//importing all the sechma from model file
var Campground = require("../model/campground.js"),
    Comment = require("../model/comments"),
     User = require("../model/user.js") 



router.get("/campground/new", isLoggedIn, function(req,res){
	res.render("campgrounds/new.ejs" ,{currentUser:req.user} )	
})



router.post("/campground",isLoggedIn, function(req,res){
	
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
    var author = {
		id : req.user._id,
		username : req.user.username
	}
	
	var campdata = {author:author,name:name , image:image ,description:description }
	
	console.log(req.user)
	
	Campground.create(campdata,function(err , campgro){
	if(err){
		console.log("somthing went wrong into data base insertion!")
	}else{
		console.log(campgro)
		res.redirect("/campground")
	}
})
})


router.get("/campground" , function(req,res){
	
	Campground.find({},function(err,allcamp){
		if(err){
			console.log("retreving error!!")
		}
		else{
			
			res.render("campgrounds/Index" , {camp:allcamp , currentUser:req.user})
		}
	})
	
	
})


//SHOW - shows more info about campground selected - to be declared after NEW to not overwrite
router.get("/campground/:id", function(req, res){
    //find the campground with the provided ID
    Campground.findOne({_id:req.params.id}).populate("comments").exec(function(err, foundCampground){
       if (err) {
           console.log(err);
       } else {
            //render show template with that campground
		   console.log(foundCampground)
		   
           res.render("campgrounds/show", {campground: foundCampground , currentUser:req.user});
       }
    });
});


//edit
router.get("/campground/:id/edit" ,checkauth, function(req,res){
	
	
	
	
	Campground.findOne({_id:req.params.id} , function(err, foundCampground){
		
             if(err){
				 console.log("smting went wrong!!")
			 }else{	
			res.render("campgrounds/edit" , {campground: foundCampground ,currentUser:req.user })
			 }
		   })
		   
		   
		   })


router.put("/campground/:id" , checkauth, function(req,res){
	//find the campground and update
	//redirect somewhere
	var newcamp  = {
		name:req.body.name,
		image:req.body.image,
		description:req.body.description
	}
	
	
	Campground.findByIdAndUpdate(req.params.id , newcamp, function(err,updatedcamp){
		if(err){
			console.log("hey smthing wen wrong!!!")
		}else{
			
			res.redirect("/campground/" + req.params.id)
			
		}
	}
	)
})


router.delete("/campground/:id",checkauth, function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			console.log("delete request")
			res.redirect("/campground")
		}else{
			console.log("delete request")
			res.render("campgrounds/Index")
		}
	})
})



//is logedin?  function
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.redirect("/login")
	}
}

function checkauth(req,res,next){
    if(req.isAuthenticated()){
		
	    Campground.findOne({_id:req.params.id} , function(err, foundCampground){
			
		
             if(err){
				 console.log("smting went wrong!!")
			 }else{	
				 if(foundCampground.author.id.equals(req.user._id)){
			       next();
				 }else{
					res.send("your are not authinticated to do these activity")
				 }
			 }
		   })	
		
		
	}else{
		res.send("you need to be logined bro!!!")
	}
}
module.exports = router;