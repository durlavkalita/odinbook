var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

var postController = require('../controllers/postController');
var commentController = require('../controllers/commentController');
var friendController = require('../controllers/friendController');
var likeController = require('../controllers/likeController');

require('../auth');

router.get('/posts', passport.authenticate('jwt', { session: false }), postController.get_posts);
router.post('/posts', passport.authenticate('jwt', { session: false }), postController.create_post);

router.get('/posts/:postId/comments', passport.authenticate('jwt', { session: false }), commentController.get_comments);
router.post('/posts/:postId/comments', passport.authenticate('jwt', { session: false }), commentController.create_comment);

router.get('/posts/:postId/likes', passport.authenticate('jwt', { session: false }), likeController.get_likes);
router.post('/posts/:postId/likes', passport.authenticate('jwt', { session: false }), likeController.create_like);

// friend routes //
// POST send friend request
router.post('/friends/:receiverUserId', passport.authenticate('jwt', { session: false }), friendController.send_friend_request);
// GET all friend requests
router.get('/friends/:userId', passport.authenticate('jwt', { session: false }), friendController.view_friend_requests);
// POST friend request answer
router.post('/friends/:friendId/response', passport.authenticate('jwt', { session: false }), friendController.response_friend_request);


module.exports = router;
