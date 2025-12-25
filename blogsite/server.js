const express=require('express');
const app=express();
const cors = require('cors');

const mongoose = require('mongoose');
const Post = require('./models/Post');
const User = require('./models/User');
// require('dotenv').config();

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());


mongoose.connect("mongodb://localhost:27017/blogsite")
  .then(() => console.log("Post DB Connected"))
  .catch(err => console.error(err));
  

  mongoose.connect("mongodb://localhost:27017/blogsite")
  .then(() => console.log("User DB Connected"))
  .catch(err => console.error(err));

// app.post("/",async(req,res)=>{
//     const {username,password}=req.body;
//     const newUser = new User({
//       username: username,
//       password: password})
      
//       const savedUser= await newUser.save();
//       res.send(`user ${username} just logged in`)
      
// })
app.post("/sign-up",async(req,res)=>{

})

app.get("/sign-in",(req,res)=>{
    res.send("Welcome to the Blogsite API!");
})




app.get("/blogs",async(req,res)=>{
    try {
    // .find() looks for all documents in the collection
    const posts = await Post.find(); 
    
    res.json(posts);

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
})

app.get('/user-blogs/:userId',async(req,res)=>{
  const userId=req.params.userId
  try{
    const user_posts=await Post.find({author:userId})
    res.json(user_posts)

  }catch(error){
    res.status(500).json({ message: "Server Error", error: error.message });
  }

})

app.get("/all-users",async(req,res)=>{
    // .find() looks for all documents in the collection
    const users = await User.find(); 
    res.json(users);  
  })

app.post("/post-blog/:userId",async(req,res)=>{
    const title=req.body.title;
    const content=req.body.content;
    const authorId = req.params.userId;

    const newPost = new Post({
        title: title,
        content: content,
      author:authorId})

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


app.put("/edit-blog/:postId",async(req,res)=>{
  const postId=req.params.postId;
  const {title,content}=req.body;
  try{
    const updatedPost=await Post.findByIdAndUpdate(postId,{title,content},{new:true});
    res.json(updatedPost);
  }catch(error){
    res.status(500).json({ message: "Server Error", error: error.message });
  }
})
app.delete("/delete-blog/:postId",async(req,res)=>{
  const postId=req.params.postId; 
  try{
    await Post.findByIdAndDelete(postId);
    res.json({message:"Post deleted successfully"});
  }catch(error){
    res.status(500).json({ message: "Server Error", error: error.message });
  } })
app.listen(3000)

