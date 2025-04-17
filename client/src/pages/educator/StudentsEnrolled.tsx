import {lazy, Suspense, useContext, useEffect, useState} from "react";
import Loading from "../../components/student/Loading";
import {EnrolledStudents} from "../../Model/StudentEnrolled.ts";
import {AppContext} from "../../context/AppContext.tsx";
import axios from "axios";
import {toast} from "react-toastify";

import {handleError} from "../../lib/Error.tsx";

const EnrolledStudentsData = lazy(() => import("./EnrolledStudentsData.tsx"));


const StudentsEnrolled = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("context must be used within an AppContextProvider");
    }

    const {backendUrl, getToken, isEducator} = context
    const [enrolledStudents, setEnrolledStundents] = useState<EnrolledStudents>();

    const fetchEnrolledStudents = async () => {
        try {
            const token = await getToken();
            const {data} = await axios.get(backendUrl + "/api/educator/enrolled-students", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (data.success) {
                setEnrolledStundents(data.enrolledStundents?.reverse())
            } else {
                toast.error(data.message);
            }
        } catch (e: unknown) {
            handleError(e)
        }
    };

    useEffect(() => {
        if (isEducator) {

            fetchEnrolledStudents();
        }
    }, [isEducator]);
    return (
        <div className="min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0">
            <div
                className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
                <table className="table-fixed md:table-auto w-full overflow-hidden pb-4">
                    <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
                    <tr>
                        <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">
                            #
                        </th>
                        <th className="px-4 py-3 font-semibold">Student Name</th>
                        <th className="px-4 py-3 font-semibold">Date</th>
                    </tr>
                    </thead>
                    <Suspense fallback={
                        <div className="flex justify-center items-center">
                            < Loading/>
                        </div>
                    }>
                        <EnrolledStudentsData enrolledStudents={enrolledStudents}/>
                    </Suspense>
                </table>
            </div>
        </div>
    )
};

export default StudentsEnrolled;
