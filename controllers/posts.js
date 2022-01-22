import PostMessage from "../models/postMessage.js";
import mongoose from 'mongoose';


export const getPosts=async (req,res)=>{
  try {
    const postMessages= await PostMessage.find();
    res.status(200).json(postMessages);

  } catch (e) {
    res.status(404).json({message:e.message});
  }
}

export const createPost=async (req,res)=>{
  const post=req.body;
  const newPost=new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (e) {
    res.status(409).json({message:e.message});
  }
}

export const updatePost=async (req,res) =>{
  try{const { id:_id} = req.params;
  const post=req.body;
  if(!mongoose.Types.ObjectId(_id)) return res.status(404).send("No post with that Id");

  const updatePost=  await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new:true});
  res.json(updatePost);}
  catch (e) {
    res.status(409).json({message:e.message});
  }
}

export const deletePost=async (req,res) =>{
  try{
    const { id} = req.params;

  if(!mongoose.Types.ObjectId(id)) return res.status(404).send("No post with that Id");

  await PostMessage.findByIdAndRemove(id);
  res.json({message:"post deleted successfully"});
}
  catch (e) {
    res.status(409).json({message:e.message});
  }
}

export const likePost=async (req,res) =>{
  try{
    const { id} = req.params;

  if(!mongoose.Types.ObjectId(id)) return res.status(404).send("No post with that Id");

  const post=await PostMessage.findById(id);
  const updatedPost=await PostMessage.findByIdAndUpdate(id,{likeCount:post.likeCount + 1},{new:true});
  res.json(updatedPost);
}
  catch (e) {
    res.status(409).json({message:e.message});
  }
}
