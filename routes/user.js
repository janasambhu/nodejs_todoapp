import express from "express";
import {getAllUser, getMyProfile,login, logout, register} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.get("/all",isAuthenticated, getAllUser);
router.post("/new",isAuthenticated, register);
router.post("/login",isAuthenticated,login);
router.get("/me",isAuthenticated,getMyProfile);
router.get("/logout",isAuthenticated,logout);


//.put(updateuser).delete(deleteuser);
// router.get("/userid/:id",userbyid);
// router.put("/userid/:id",updateuser);
// router.delete("/userid/:id",deleteuser);
export default router;
