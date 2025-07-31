import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware";
import {  getMessages, sendMessage } from "../controller/message.controller";

const messageRouter = Router();

messageRouter.post("/:id",protectRoute, getMessages);
messageRouter.post("/send/:id",protectRoute, sendMessage);

export default messageRouter;
