export interface LectureDetails {
  lectureTitle: string;
  lectureDuration: string;
  lectureUrl: string;
  isPreviewFree: boolean;
}

export interface Chapter {
  chapterId: number;
  chapterTitle: string;
  chapterContent: Lecture[];
  collapsed: boolean;
  chapterOrder: number;
}

export interface Lecture {
  lectureTitle: string;
  lectureDuration: string;
  lectureUrl: string;
  isPreviewFree: boolean;
  lectureOrder: number;
  lectureId: number;
}
