const express=require('express');
const app=express();
const mongoose = require('mongoose');
const Post = require('./models/Post');
// require('dotenv').config();


app.use(express.json());


mongoose.connect("mongodb://localhost:27017/blogsite")
  .then(() => console.log("DB Connected"))
  .catch(err => console.error(err));
  

app.get("/",(req,res)=>{
    res.send("Welcome to the Blog Site!");
})
app.get("/blogs",(req,res)=>{
    res.send("Here are all the blog posts.");
})

app.post("/post-blog",async(req,res)=>{
    const title=req.body.title;
    const content=req.body.content;
    

    const newPost = new Post({
        title: title,
        content: content})

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
    // res.send("New blog post created!");
    // console.log(`New blog post titled "${title}" created with content: ${content}`);
    console.log("A new blog post has been created.");
})

app.post("/edit-blog",(req,res)=>{
    res.send("Blog post edited or deleted!");
    console.log("A blog post has been edited or deleted.");
})



app.listen(3000)

