const express=require('express');
const app=express();

app.get("/",(req,res)=>{
    res.send("Welcome to the Blog Site!");
})
app.get("/blogs",(req,res)=>{
    res.send("Here are all the blog posts.");
})

app.post("/post-blog",(req,res)=>{
    res.send("New blog post created!");
    console.log("A new blog post has been created.");
})

app.post("/edit-blog",(req,res)=>{
    res.send("Blog post edited or deleted!");
    console.log("A blog post has been edited or deleted.");
})



app.listen(3000)

