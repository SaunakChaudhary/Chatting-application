const conversationModel = require("../Model/conversation.model");
const messageModel = require("../Model/message.model");
const { getReceiverSocketId } = require("../Socket/socket");

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new messageModel({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);
    // socket io functionality
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    return res
      .status(200)
      .json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error : " + error });
  }
};

const getMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const conversation = await conversationModel
      .findOne({
        participants: { $all: [senderId, receiverId] },
      })
      .populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    return res.status(200).json({ messages: conversation.messages });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error : " + error });
  }
};

module.exports = { sendMessage, getMessage };
