const User = require('../models/User');

const {body, validationResult} = require('express-validator');

exports.update_profile_pic = async (req,res,next)=> {
  const user = await User.findById(req.params.userId);
  if(!user) {
    return res.status(404).json({err: "User not found"});
  }
  try {
    const newUser = await User.findByIdAndUpdate(req.params.userId, 
      {$set: {"profilePic": req.body.profilePic}}
    );
    res.status(200).json({message: "Photo added"});  
  } catch (error) {
    console.log(error);
  }
}