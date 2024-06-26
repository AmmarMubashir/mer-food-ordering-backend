import express from "express";
import multer from "multer";
import { createMyRestaurant } from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParser } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParser,
  createMyRestaurant
);

export default router;
