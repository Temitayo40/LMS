export interface DashboardModel {
    totalEarnings: number
    enrolledStudentsData: EnrolledStudentsDatum[]
    totalCourses: number
}

export interface EnrolledStudentsDatum {
    courseTitle: string
    student: Student
}

export interface Student {
    _id: string
    name: string
    imageUrl: string
}
