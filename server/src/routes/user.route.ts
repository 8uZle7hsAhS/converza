import { Router } from "express";
import { updateProfile } from "../controller/user.controller";
import { protectRoute } from "../middlewares/auth.middleware";

const userRoute = Router(); 

userRoute.put("/update-profile", protectRoute, updateProfile)

export default userRoute; 