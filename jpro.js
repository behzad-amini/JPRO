
var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine","ejs");



// show hi there!
app.get("/",function(req,res){
    res.render("index");
});

app.get("/subscribe",function(req,res){
    res.render("subscribe");
})

app.post("/subscribe", function(req,res){
    
})

app.listen(process.env.PORT,process.env.IP, function(){
    console.log("server started");
});