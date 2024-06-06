const express = require("express");
const router = express.Router();
const Message = require("../../models/message");
const { checkTokenMiddleware, getUser } = require("../../config/checkToken");

// Middleware to check authentication
const authenticateUser = (req, res, next) => {
  const user = getUser(req, res);
  if (!user) return res.status(401).json("Unauthorized");
  next();
};

// Send a message
router.post("/", checkTokenMiddleware, authenticateUser, async (req, res) => {
  const { receiver, messageContent } = req.body;
  const sender = getUser(req, res)._id; //go to token and decipher.

  try {
    const message = new Message({ sender, receiver, messageContent });
    await message.save();
    res.status(201).send(message);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all messages for a user
router.get("/", checkTokenMiddleware, authenticateUser, async (req, res) => {
  const userId = getUser(req, res)._id;
  console.log("Fetching messages for user ID:", userId);

  try {
    const messages = await Message.find({
      //Mongo query finds messages where current user is either sender or receiver
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate({
        path: "sender",
        select: "name",
      })
      .populate("receiver", "name"); // Also populate the receiver's name

    res.status(200).send(messages);
  } catch (error) {
    res.status(400).send(error);
  }
});

//

module.exports = router;
