const Like = require('../models/Like');
const Post = require('../models/Post');
const User = require('../models/User');

const {body, validationResult} = require('express-validator');

// GET get comments
exports.get_likes = async (req,res,next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if(!post) {
      return res.status(404).json({err: "Post not found"});
    }
    const likes = await Like.find({postId: post});
    if(!likes) {
      return res.status(404).json({err: "No likes not found"});
    }
    res.status(200).json({likes: likes.length});
  } catch (error) {
    next(error);
  }
} 

// POST create comment
exports.create_like = async (req,res,next)=> {
  const post = await Post.findById(req.params.postId);
  if(!post) {
    return res.status(404).json({err: "Post not found"});
  }
  var like = new Like(
    {
      userId: req.body.userId,
      postId: req.params.postId
    }
  );
  like.save(error => {
      if(error){return next(error);}
      res.status(200).json({message: "Like Created"})
  });
}