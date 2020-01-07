//import
const express=require('express');
const app=express();
const expressHandlebars=require('express-handlebars');
const bodyparser=require('body-parser');
var path=require('path');
var mongoose=require("mongoose");
var mongo=require('mongodb');
app.use(bodyparser.urlencoded({ extended:true}));
// var assert=require('assert');
var cons = require('consolidate');
app.use(express.static(path.join(__dirname,"views")));
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
var url="mongodb://localhost/contact";
mongoose.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true });
var dataSchema=new mongoose.Schema({
    name:String,
    subject:String,
    email:String,
    msg:String
});
var message=mongoose.model("message",dataSchema);

app.post("/contactpost",(req,res)=>{
    var newData=new message({
        name:req.body.name,
        email:req.body.email,
        subject:req.body.subject,
        msg:req.body.message
    });
    newData.save(function(err,data){
        if(err){
            console.log("error");
        }else{
            console.log("saved");
        }
    });
    res.render("src/contact.html");
})

app.get("/",(req,res)=>{
    res.render("src/works.html");
});
app.get("/phy10.html",(req,res)=>{
    res.render("src/phy10.html");
});
app.get("/works.html",(req,res)=>{
    res.render("src/works.html");
});
app.get("/contact.html",(req,res)=>{
    res.render("src/contact.html");
});
var PORT=process.env.PORT || 5050;
app.listen(PORT,()=>{
    console.log("server started on port "+PORT);
});
