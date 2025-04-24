import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Course, CourseContent, CourseRating, Courses} from "../Model/Courses";
import humanizedDuration from "humanize-duration";
import {useAuth, useUser} from "@clerk/clerk-react";
import axios from "axios";
import {toast} from "react-toastify";
import {handleError} from "../lib/Error";
import {UserInterface} from "../Model/User";

interface AppContextType {
    currency: string | undefined;
    allCourses: Courses;
    enrolledCourses: Courses;
    navigate: ReturnType<typeof useNavigate>;
    calculateRating: (course: Course) => number;
    calculateNoOfLectures: (course: Course) => number;
    calculateCourseDuration: (course: Course) => number;
    calculateChapterTime: (chapter: CourseContent) => string;
    isEducator: boolean;
    setIsEducator: React.Dispatch<React.SetStateAction<boolean>>;
    setEnrolledCourses: React.Dispatch<React.SetStateAction<Courses>>;
    fetchUserEnrolledCourses: () => Promise<void>;
    backendUrl: string;
    userData: UserInterface;
    setUserData: React.Dispatch<React.SetStateAction<UserInterface>>;
    getToken: () => Promise<string | null>;
    fetchAllCourses: () => Promise<void>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
    children: React.ReactNode;
}

export const AppContextProvider = (props: AppContextProviderProps) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const {getToken} = useAuth();
    const {user} = useUser();
    const [allCourses, setAllCourses] = useState<Courses>([]);
    const [isEducator, setIsEducator] = useState(true);
    const [enrolledCourses, setEnrolledCourses] = useState<Courses>([]);
    const [userData, setUserData] = useState<UserInterface>({} as UserInterface);

    // fetch All courses
    const fetchAllCourses = async () => {
        try {
            const {data} = await axios.get(backendUrl + "/api/course/all");
            if (data.success) {
                setAllCourses(data.courses);
            } else {
                toast.error(data.message);
            }
        } catch (error: unknown) {
            // handleError(error);
            console.log(error)
        }
    };

    // Fetch User Data
    const fetchUserData = async () => {
        if (user?.publicMetadata.role === "educator") {
            setIsEducator(true);
        }
        try {
            const token = await getToken();

            const {data} = await axios.get(backendUrl + "/api/user/data", {
                headers: {Authorization: "Bearer " + token},
            });

            if (data.success) {
                setUserData(data.user);
            } else {
                toast.error(data.message);
            }
        } catch (error: unknown) {
            handleError(error);
        }
    };

    const calculateRating = (course: Course) => {
        if (course.courseRatings.length === 0) {
            return 0;
        }

        let totalRatings = 0;
        course.courseRatings.forEach((ratings: CourseRating) => {
            totalRatings += ratings.rating;
        });

        return Math.floor(totalRatings / course.courseRatings.length);
    };

    // calculatre course chp time
    const calculateChapterTime = (chapter: CourseContent) => {
        let time = 0;
        chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
        return humanizedDuration(time * 60 * 1000, {units: ["h", "m"]});
    };

    // to calacu;ate Course Duration
    const calculateCourseDuration = (course: Course): string => {
        let time = 0;
        course.courseContent.forEach((chapter) =>
            chapter.chapterContent.forEach((lecture) => {
                time += lecture.lectureDuration;
            })
        );

        // Format time
        if (time < 60) {
            return `${time} minute${time === 1 ? '' : 's'}`;
        } else {
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            return `${hours} hour${hours === 1 ? '' : 's'}${minutes > 0 ? ` ${minutes} minute${minutes === 1 ? '' : 's'}` : ''}`;
        }
    };


    //calculate number rof lecture in the course
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
        try {
            const token = await getToken();
            const {data} = await axios.get(
                backendUrl + "/api/user/enrolled-courses",
                {headers: {Authorization: "Bearer " + token}}
            );

            if (data.success) {
                setEnrolledCourses(data.enrolledCourses.reverse());
            } else {
                toast.error(data.message);
            }
        } catch (error: unknown) {
            handleError(error)
        }
    };

    const getTokens = async () => {
        console.log(await getToken());
    };

    useEffect(() => {
        fetchAllCourses();
        getTokens();
    }, []);

    useEffect(() => {
        if (user) {
            fetchUserData();
            fetchUserEnrolledCourses();
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
        backendUrl,
        userData,
        setUserData,
        getToken,
        fetchAllCourses,
    };

    return (
        <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
    );
};
