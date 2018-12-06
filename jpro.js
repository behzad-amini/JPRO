var express                 = require('express'),
    mongoose                = require('mongoose'),
    passport                = require('passport'),
    bodyParser              = require('body-parser'),
    expressSanitizer        = require("express-sanitizer"),
    User                    = require('./models/user'),
    LocalStrategy           = require('passport-local'),
    passportLocalMongoose   = require('passport-local-mongoose');
    
mongoose.connect('mongodb://localhost/job_mngt_app');

var app=express();

app.use(require('express-session')({
    secret: 'smile buddy',
    resave: false,
    saveUninitialized: false
}));

app.set('view engine','ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());



passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//====================
//   Routs
//====================

app.get('/',function(req,res){
    res.render('home');
});

app.get('/jobmanager',isLoggedIn,function(req,res){
    res.render('jobmanager');
});

//=======================
// Authentication Routs
//=======================


//registeration
//=============
app.get('/register', function(req, res) {
    res.render('register');    
} );
app.post('/register',function(req,res){
    
    if(req.body.password!=req.body.passwordr){
        res.render('register');
    }
    
    User.register(new User({username: req.body.username}),
                    req.body.password,
                    function(err,user){
                        if(err){
                            console.log(err);
                            res.render('register');
                        }
                    
                        passport.authenticate("local")(req, res, function(){
                            res.send('registeration worked');
                        });
                    }
    )
});

//login
//=============
app.get('/login',function(req, res) {
    res.render('login');
});

app.post('/login',passport.authenticate("local",{
    successRedirect: '/jobmanager',
    failureRedirect: '/login'
}),function(req,res){
})

//logout
//=============
app.get('/logout',function(req, res) {
    req.logout();
    res.redirect('/');
});

//is logged in middleware
//=============
function isLoggedIn(req,res,next){
    
    if(req.isAuthenticated()){
        return next();
    }    
    
    res.render('login');
}























//====================
app.listen(process.env.PORT,process.env.IP,function(){
    console.log('Server Started!');
})
