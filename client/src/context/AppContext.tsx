import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext({});

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider = (props: AppContextProviderProps) => {
  const navigate = useNavigate();
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }

    let totalRatings = 0;
    course.courseRatings.forEach((ratings) => {
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
