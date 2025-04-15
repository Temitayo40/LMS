export type Courses = Course[];

export interface Course {
  _id: string;
  courseTitle: string;
  courseDescription: string;
  coursePrice: number;
  isPublished: boolean;
  discount: number;
  courseContent: CourseContent[];
  educator: { name: string };
  enrolledStudents: string[];
  courseRatings: CourseRating[];
  createdAt: string;
  updatedAt: string;

  __v: number;
  courseThumbnail: string;
}

export interface CourseContent {
  chapterId: string;
  chapterOrder: number;
  chapterTitle: string;
  chapterContent: ChapterContent[];
}

export interface ChapterContent {
  lectureId: string;
  lectureTitle: string;
  lectureDuration: number;
  lectureUrl: string;
  isPreviewFree: boolean;
  lectureOrder: number;
  chapter?: number;
  lecture?: number;
}

export interface CourseRating {
  userId: string;
  rating: number;
  _id: string;
}
