var express     = require("express"),
    app         = express(),
	
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    nodemailer = require('nodemailer'),
    passport  = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	Campground  = require("./model/campground"),
    seedDB      = require("./seed"),
    Comment     = require("./model/comments"),
    User = require("./model/user")
		
		
var commentsRouter = require("./routes/comments.js"),
	indexRouter    = require("./routes/index.js"),
    campgroundRouter = require("./routes/campground.js")
	

	
	
var Chart = require('chart.js');
var $ = require( "jquery" );
const request = require('request');

mongoose.connect("mongodb://127.0.0.1:27017/yelp")
app.use(bodyParser.urlencoded({extended : true}))
app.set("view engine" , "ejs");
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"))

//seedDB();  //seed data base

//passport
app.use(require("express-session")({
	secret : "Once again Rusty wins cutest doh!",
	resavae : false,
	saveUnitialization :false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",function(req,res){
	res.render("landing")
})


app.use(commentsRouter)
app.use(indexRouter)
app.use(campgroundRouter)









//--------charts----------------------------------------------------------------------------------
app.get("/pie",function(req,res){
	

var audu = 89;
	
	res.render("pie.ejs",{num:audu})
	
})

//-----------location--------------------------------------------------------------------------------
app.get("/location",function(req,res){
	
	
res.render("location2")


	
})

//-------menue-right drawer------------------------------------------------------------

app.get("/menu" , function(req,res){
	
	res.render("menu")
})



app.listen(3000,function(err){
	if(err){
		console.log("server connection error!!")
		console.log("Reconnecting . . . ")
	}else{
		console.log("connecting . . . ")
		console.log("connected successfully")
	}
})