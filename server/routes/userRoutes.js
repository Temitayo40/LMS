import express from "express";
import {
  addUserRating,
  getUserCourseProgress,
  getUserData,
  purchaseData,
  updateCourseProgress,
  userEnrolledCourses,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/data", getUserData);
userRouter.get("/enrolled-courses", userEnrolledCourses);
userRouter.post("/purchase", purchaseData);
userRouter.post("/update-course-progress", updateCourseProgress);
userRouter.post("/get-course-progress", getUserCourseProgress);
userRouter.post("/add-rating", addUserRating);

export default userRouter;
