const signupController = require('../controllers/signupController.js');
const thoughtsController = require('../controllers/thoughtsController.js');

const validateToken = require('../middlewares/validateToken.js');

// router
const router = require('express').Router();

// routes
router.post('/signup', signupController.signup);

router.post('/login', signupController.signin);

router.post('/postthought', validateToken, thoughtsController.postThought);

router.post('/postreply', validateToken, thoughtsController.replyThought);

router.post('/deleteThought', validateToken, thoughtsController.deleteThought);

router.post('/deleteReply', validateToken, thoughtsController.deleteReply);

router.get('/allthoughts', validateToken, thoughtsController.listThoughts);

router.get('/thoughts?:q', validateToken, thoughtsController.listThoughtsByUserId);

module.exports = router