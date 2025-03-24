import { clerkClient } from "@clerk/express";
import Course from "../models/Course.ts";
import cloudinary from "cloudinary";
// change role
export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });

    res
      .status(200)
      .json({ success: true, message: "You can publish a course now" });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

//add new course

export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;

    const imagefile = req.file;
    const educatorId = req.auth.userId;

    if (!imagefile) {
      return res.json({ success: false, message: "Thumbnail Not Attached" });
    }

    const parsedCourseData = JSON.parse(courseData);
    parsedCourseData.educator = educatorId;
    const newCourse = await Course.create(parsedCourseData);

    const imageupload = await cloudinary.uploader.upload(imagefile.path);

    newCourse.courseThumbnail = imageupload.secure_url;

    await newCourse.save();

    res.json({ success: true, message: "Course Added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
