import {Students} from "../../Model/StudentEnrolled.ts";

const EnrolledStudentsData = ({enrolledStudents}:  any ) => {
    return (
        <tbody className="text-sm text-gray-500">
        {enrolledStudents?.map((item: Students, index: number) => (
            <tr key={index} className="border-b border-gray-500/20">
                <td className="px-4 py-3 text-center hidden sm:table-cell">
                    {index + 1}
                </td>
                <td>
                    <img
                        src={item.student.imageUrl}
                        alt="profile"
                        className="w-9 h-9 rounded-full"
                    />
                    <span className="truncate">{item.student.name}</span>
                </td>
                <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                <td className="px-4 py-3 truncate hidden sm:table-cells">
                    {new Date(item.purchaseDate).toLocaleDateString()}
                </td>
            </tr>
        ))}
        </tbody>
    )
}
export default EnrolledStudentsData
