const Comment = require('../models/Comment');
const Post = require('../models/Post');

const {body, validationResult} = require('express-validator');

// GET get comments
exports.get_comments = async (req,res,next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if(!post) {
      return res.status(404).json({err: "Post not found"});
    }
    const comments = await Comment.find({postId: post});
    if(!comments) {
      return res.status(404).json({err: "No comments not found"});
    }
    res.status(200).json({comments});
  } catch (error) {
    next(error);
  }
} 

// POST create comment
exports.create_comment = [
  body('comment', 'Comment cannot be empty.').trim().isLength({min:1}).escape(),
  async (req,res,next)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.status(401).json({
        data: req.body,
        errors: errors.array(),
      });
      return;
    }
    else {
      const post = await Post.findById(req.params.postId);
      if(!post) {
        return res.status(404).json({err: "Post not found"});
      }
      var comment = new Comment(
        {
          comment: req.body.comment,
          userId: req.body.userId,
          postId: req.params.postId
        }
      );
      comment.save(error => {
          if(error){return next(error);}
          res.status(200).json({message: "Comment Created"})
      });
    }
  }
]