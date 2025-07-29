import { Router } from "express";
import { signup, logout, login } from "../controller/auth.controller";

const authRoute = Router(); 

authRoute.post("/signup", signup); 
authRoute.post("/get", login)
authRoute.post("/logout", logout)
export default authRoute;