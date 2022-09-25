import express from "express";

import { getUser, updateUserProfile } from "../controller/userController";
import { checkAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/me", checkAuth, getUser);
router.post("/profile", checkAuth, updateUserProfile);

export default router;
