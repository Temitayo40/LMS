import Course from "../models/Course.js";

export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .select(["-courseContent", "-enrolledStudents"])
      .populate({ path: "educator" });
    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const id = req.params.id;
    const courseData = await Course.findById(id).populate({ path: "educator" });
    // console.log(courseData);

    //remove lectureUrl if isPreview is false
    courseData.courseContent.forEach((content) => {
      //  const newData = Array.isArray(content.chapterContent);
      content.chapterContent.forEach((lecture) => {
        if (!lecture.isPreviewFree) {
          lecture.lectureUrl = "";
        }
      });
    });

    res.json({ success: true, courseData });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};
