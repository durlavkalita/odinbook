var Friend = require('../models/Friend');
var User = require('../models/User');

exports.send_friend_request = async (req,res,next) => {
    try {
        const receiverUser = await User.findById(req.params.receiverUserId);
        if(!receiverUser) {
          return res.status(404).json({err: "User not found"});
        }
        if(req.body.userId == req.params.receiverUserId) {
          return res.status(404).json({msg: "can't send friend request to yourself"});
        }
        var friend = await Friend.find({senderId : req.body.userId, receiverId : req.params.receiverUserId});
        if(friend.length != 0) {
          return res.status(404).json({error: "Request already sent."});
        }
        var friend = new Friend(
            {
              senderId: req.body.userId,
              receiverId: req.params.receiverUserId,
            }
          );
          friend.save(err=>{
            if(err) {return next(err);}
            res.status(200).json({message: "Friend request sent"})
          });
      } catch (error) {
        next(error);
    }
}

exports.view_friend_requests = async (req,res,next) => {
  try {
    const requests = await Friend.find({"receiverId": req.params.userId, response: false});
    if(!requests) {
      return res.status(404).json({error: "Could not found"});
    }
    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
}

exports.view_friends = async (req,res,next) => {
  try {
    const requests = await Friend.find({ $or: [{"receiverId": req.params.userId}, {"senderId": req.params.userId}] , response: true});
    if(!requests) {
      return res.status(404).json({error: "Could not found"});
    }
    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
}

exports.response_friend_request = async (req,res,next) => {
  try {
    const request = await Friend.findById(req.params.friendId);
    if(!request) {
      return res.status(404).json({error: "Invalid friend request"})
    }
    // if(req.params.userId != receiverId){
    //   return res.status(401).json({error: "Unauthorized"})
    // }
    if(req.body.response == true) {
      const friendResponse = await Friend.findByIdAndUpdate(req.params.friendId, 
        {$set: {"response": true}}
      );
      res.status(200).json({message: "Friend added"});
    }
    else {
      try {
        await Friend.findByIdAndRemove(req.params.friendId, function(err){
            if(err) {next(err);}
            res.status(204).json({message: "request deleted"});
        });
      } catch (error) {
          next(error);
      }
    }
  } catch (error) {
    next(error);
  }
}

exports.find_people = async (req,res,next) => {
  try {
    const peoples = await User.find();
    if(peoples.length == 0) {
      return res.status(404).json({error: "No user not found"});
    }
    res.status(200).json(peoples);
  } catch (error) {
    next(error);
  }
}