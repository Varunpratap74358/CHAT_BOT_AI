import { Chat } from "../model/chatModel.js";
import { Conversation } from "../model/conversationModel.js";

export const createChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const chat = await Chat.create({
      user: userId,
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addConversation = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return res.status(400).json({
        message: "No chat with this id..",
      });
    }
    const conversation = await Conversation.create({
      chat: chat._id,
      question: req.body.question,
      answer: req.body.answer,
    });
    const updatedChat = await Chat.findByIdAndUpdate(
      req.params.id,
      { latestMessage: req.body.question },
      { new: true }
    );
    res.status(200).json({
      conversation,
      updatedChat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({ chat: req.params.id });
    if (conversation?.length < 0) {
      res.status(400).jaon({
        message: "No conversation with this id",
      });
    }
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return res.status(400).json({
        message: "Chat not found with this id",
      });
    }
    if (chat.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized user",
      });
    }

    await Chat.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Chat deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
