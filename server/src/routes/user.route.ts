import { Router } from "express";
import { addContact, getContactsForSidebar, removeContact, searchUser, updateProfile } from "../controller/user.controller";
import { protectRoute } from "../middlewares/auth.middleware";

const userRoute = Router(); 

userRoute.put("/update-profile", protectRoute, updateProfile)
userRoute.get("/get-contact", protectRoute, getContactsForSidebar)
userRoute.get("/search-user", protectRoute, searchUser)
userRoute.post("/add-contact", protectRoute, addContact)
userRoute.post("/remove-contact", protectRoute, removeContact)

export default userRoute; 