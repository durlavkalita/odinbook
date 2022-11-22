const Post = require('../models/Post');

const {body, validationResult} = require('express-validator');

// GET all posts
exports.get_posts = async (req,res,next) => {
  try {
      var posts = await Post.find().sort({created_at:-1});
      if(!posts) {
          return res.status(404).json({error: "No posts found"});
      }
      res.status(200).json(posts)
  } catch (error) {
      next(error);
  }
}

// POST create post
exports.create_post = [
  body('content', 'Enter post content').trim().isLength({min:1}).escape(),
  (req,res,next) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          res.json({
              data: req.body,
              errors: errors.array(),
          });
          return;
      }
      else {
          var post = new Post(
              {
                  content: req.body.content,
                  userId: req.body.userId,
              }
          );
          post.save(error => {
              if(error){return next(error);}
              res.status(200).json({message: "Post Created"})
          });
      }
  }
]