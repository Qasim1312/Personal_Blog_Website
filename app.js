//jshint esversion:6
let Posts=[];
let postTitles;
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Hello everyone this is QBlog Where I Syed Qasim Hussain Share my daily life progress of coding, cooking and excercise as well as talk about my opinion on current political topics movie reviews and sometimes my favorite books.";
const aboutContent = "Syed Qasim Hussain is a student of FAST islamabad that is currently doing Bachelors in Computer Science he is an apt programmer in C++ and Python with an avid understanding of Data Analysis and Machine learning, Qasim spends his time playing video games, being upto date with newest technology and regular excercises ."
const contactContent = "Qasim can be contacted with using his lnkedin Profile, his instagram, or his through his personal blog.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/",function(req,res){
  
    res.render("home",{
      startingcontent:homeStartingContent,
      posts:Posts
    });
   
});
app.get("/posts/:categor",function(req,res){
    const requestedTitles=_.lowerCase(req.params.categor);
    
    
    Posts.forEach(function(post){
      let storedTittle=_.lowerCase(post.title);
      
      if(requestedTitles===storedTittle) {
        res.render("post", {                     // we make the sasme thing as home page that when the name and the url name are the same we print that specific info onto our page
          title:post.title,
          content:post.content
        })
      }
     
      
    });

    
});

app.get("/contact",function(req,res){
  res.render("contact",{startingcontact:contactContent});
});
app.get("/about",function(req,res){
  res.render("about",{startingabout:aboutContent});
});
app.get("/compose",function(req,res){   //server knoes what to do when we try to view it but not when we try to to do any other action there
  res.render("compose");
});

app.post("/compose",function(req,res){
  //console.log(req.body.postTitle);    //req.body comes from body parser
 
  const post= {
  
    title:req.body.postTitle, //thses are so that there are 2 inputs stored inan java script objects
    
    content:req.body.postBody
  };
  //postTitles=post.title;
  Posts.push(post); //it pushes all of the object with the heading title and its content as well as content and its contents
  res.redirect("/");
});











app.listen(3000, function() {
  console.log("Server started on port 3000");
});
