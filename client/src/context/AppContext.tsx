import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { Course, CourseRating, Courses } from "../Model/Courses";

interface AppContextType {
  currency: string | undefined;
  allCourses: Courses;
  navigate: ReturnType<typeof useNavigate>;
  calculateRating: (course: Course) => number;
  isEducator: boolean;
  setIsEducator: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider = (props: AppContextProviderProps) => {
  const navigate = useNavigate();
  const [allCourses, setAllCourses] = useState<Courses>([]);
  const [isEducator, setIsEducator] = useState(true);
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

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const currency = import.meta.env.VITE_CURRENCY;
  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
