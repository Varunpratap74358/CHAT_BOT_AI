import express from "express"
import { isAuth } from "../middelware/isAuth.js";
import { addConversation, createChat, deleteChat, getAllChats, getConversation } from "../controler/chatController.js";
const route =express.Router();

route.post('/new',isAuth,createChat);
route.get('/all',isAuth,getAllChats);
route.post("/:id",isAuth,addConversation)
route.get("/:id",isAuth,getConversation)
route.delete("/:id",isAuth,deleteChat)


export default route