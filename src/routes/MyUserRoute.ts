import express from "express";
import {
  createCurentUser,
  getCurrentUser,
  updateCurrentUser,
} from "../controllers/MyUserController";
import { jwtCheck, jwtParser } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

router.get("/", jwtCheck, jwtParser, getCurrentUser);

router.post("/", jwtCheck, createCurentUser);

router.put("/", jwtCheck, jwtParser, validateMyUserRequest, updateCurrentUser);

export default router;
