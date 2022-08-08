import express from "express";

import { getUser } from "../controller/userController";
import { checkAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/me", checkAuth, getUser);

export default router;
