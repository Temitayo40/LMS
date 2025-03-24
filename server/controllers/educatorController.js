import { clerkClient } from "@clerk/express";
import Course from "../models/Course.js";
import cloudinary from "cloudinary";
import { Purchase } from "../models/Purchase.js";
import User from "../models/User.js";
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

// get Educator  courses
export const getEducatorCourses = async (req, res) => {
  try {
    const educatorId = req.auth.userId;

    const courses = await Course.find({ educator: educatorId });

    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// get educartor dashboard data
export const educatorDashboardData = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    const totalCourses = courses.length;

    const courseIds = courses.map((course) => course._id);
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
    });
    const totalEarnings = purchases.reduce(
      (total, purchase) => total + purchase.amount,
      0
    );

    // collect unique student ids with their course title
    const enrolledStudentsData = (
      await Promise.all(
        courses.map(async (course) => {
          const students = await User.find(
            { _id: { $in: course.enrolledStudents } },
            "name imageUrl"
          );
          return students.map((student) => ({
            student,
            courseTitle: course.title,
          }));
        })
      )
    ).flat();
    // const enrolledStudentsData = [];
    // for (const course of courses) {
    //   const students = await User.find(
    //     {
    //       _id: { $in: course.enrolledStudents },
    //     },
    //     "name imageUrl"
    //   );

    //   students.forEach((student) => {
    //     enrolledStudentsData.push({
    //       student,
    //       courseTitle: course.title,
    //     });
    //   });
    // }

    res.json({
      success: true,
      totalCourses,
      totalEarnings,
      enrolledStudentsData,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// get Enrollled Students Data with Purchase Data
export const getEnrolledStudentsData = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });

    const courseIds = courses.map((course) => course._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    })
      .populate("userId", "name imageUrl")
      .populate("courseId", "courseTitle");

    const enrolledStudents = purchases.map((purchase) => ({
      student: purchase.userId,
      courseTitle: purchase.courseTitle,
      purchaseDate: purchase.createdAt,
    }));

    res.json({ success: true, enrolledStudents });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
