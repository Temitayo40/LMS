export type EnrolledStudents = Students[]

export interface Students {
    student: Student
    courseTitle: string
    purchaseDate: string
}

export interface Student {
    _id: string
    name: string
    imageUrl: string
}
