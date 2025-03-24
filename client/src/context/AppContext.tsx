import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { Course, CourseContent, CourseRating, Courses } from "../Model/Courses";
import humanizedDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react";
interface AppContextType {
  currency: string | undefined;
  allCourses: Courses;
  enrolledCourses: Courses;
  navigate: ReturnType<typeof useNavigate>;
  calculateRating: (course: Course) => number;
  calculateNoOfLectures: (course: Course) => number;
  calculateCourseDuration: (course: Course) => number;
  calculateChapterTime: (Chapter: CourseContent) => number;
  isEducator: boolean;
  setIsEducator: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider = (props: AppContextProviderProps) => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { user } = useUser();
  const [allCourses, setAllCourses] = useState<Courses>([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState<Courses>([]);
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  const calculateRating = (course: Course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }

    let totalRatings = 0;
    course.courseRatings.forEach((ratings: CourseRating) => {
      totalRatings += ratings.rating;
    });

    return totalRatings / course.courseRatings.length;
  };

  // calculatre course chp time
  const calculateChapterTime = (chapter: CourseContent) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
    return humanizedDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // to calacu;ate Course Duration
  const calculateCourseDuration = (course: Course) => {
    let time = 0;
    course.courseContent.map((chapter) =>
      chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration))
    );
    return humanizedDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  //calculate numbe rof lecture in the course

  const calculateNoOfLectures = (course: Course) => {
    let totalLEcture = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLEcture += chapter.chapterContent.length;
      }
    });
    return totalLEcture;
  };

  //fetch user Enrolled courses#
  const fetchUserEnrolledCourses = async () => {
    setEnrolledCourses(dummyCourses);
  };
  useEffect(() => {
    fetchAllCourses();
    fetchUserEnrolledCourses();
  }, []);

  const logToken = async () => {
    console.log(await useAuth());
  };
  useEffect(() => {
    if (user) {
      logToken();
    }
  }, [user]);

  const currency = import.meta.env.VITE_CURRENCY;
  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateNoOfLectures,
    calculateCourseDuration,
    calculateChapterTime,
    enrolledCourses,
    setEnrolledCourses,
    fetchUserEnrolledCourses,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
