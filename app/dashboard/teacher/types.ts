export type TeacherCourse = {
  id: string;
  title: string;
  description: string | null;
  subject: string;
  chapters: { id: string }[];
  enrollments: { id: string }[];
  liveClasses: { id: string }[];
};