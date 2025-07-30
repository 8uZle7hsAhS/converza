import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware";
import { getUsersForSidebar, getMessages, sendMessage } from "../controller/message.controller";

const messageRouter = Router();

messageRouter.post("/users",protectRoute, getUsersForSidebar);
messageRouter.post("/:id",protectRoute, getMessages);
messageRouter.post("/send/:id",protectRoute, sendMessage);

export default messageRouter;
