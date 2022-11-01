const db = require("../models");
const config = require("../config/dbConfig.js");
const Thoughts = db.models.thoughts;
const Reply = db.models.reply;
const Op = db.Sequelize.Op;

// for posting thought
exports.postThought = async (req, res) => {
  try {
    const thought = await Thoughts.create({
      userId: req.body.userId,
      thought: req.body.thought,
      isAnonymous: req.body.isAnonymous
    });
    console.log("thought created");
    console.log(thought);
    res.json(thought.thoughtId);
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  };
}

// replying thought
exports.replyThought = async (req, res) => {
  try {
    const reply = await Reply.create({
      reply: req.body.reply,
      thoughtId: req.body.thoughtId,
      isAnonymous: req.body.isAnonymous
    });
    console.log("reply created");
    console.log(reply);
    res.json(reply);
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  };
}

// deleting thought
exports.deleteThought = async (req, res) => {
  try {
    const thought = await Thoughts.destroy({
      where: { "thoughtId": req.body.thoughtId }
    });

    const reply = await Reply.destroy({
      where: { "thoughtId": req.body.thoughtId }
    });

    console.log("thought deleted");
    console.log(thought);
    res.json(reply);

  }
  catch (err) {
    res.status(500).send({ message: err.message });
  };
}

// deleting reply
exports.deleteReply = async (req, res) => {
  try {
    const reply = await Reply.destroy({
      where: { "replyId": req.body.replyId }
    });

    console.log("reply deleted");
    console.log(reply);
    res.json(reply);
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  };
}

// listing all thoughts
exports.listThoughts = async (req, res) => {
  console.log("hey");
  try {
    const thoughts = await Thoughts.findAll({
      where: { 'isAnonymous': false }
    });
    res.json(thoughts);
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  };
}

// listing thoughts for non-anonymous users
exports.listThoughtsByUserId = async (req, res) => {
  console.log("inside by id");
  try {
    const thoughts = await Thoughts.findAll({
      where: {
        [Op.and]: [
          { userId: req.query.userId },
          { isAnonymous: false }
        ]
      }
    });
    res.json(thoughts);
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  };
}
