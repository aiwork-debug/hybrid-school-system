export type CourseSummary = {
  id: string;
  title: string;
  subject: string;
  createdAt: Date;
  enrollments: { id: string }[];
  chapters: { id: string }[];
};

export type Teacher = {
  id: string;
  name: string | null;
  email: string;
  subject: string | null;
  coursesTaught: CourseSummary[];
};

export type Student = {
  id: string;
  name: string | null;
  email: string;
  enrollments: { id: string; course: { id: string; title: string; subject: string } }[];
};

export type Course = {
  id: string;
  title: string;
  description: string | null;
  subject: string;
  teacher: { name: string | null; email: string };
  chapters: { id: string }[];
  enrollments: { id: string }[];
};

export type DeleteTarget = {
  id: string;
  name: string;
  kind: "TEACHER" | "STUDENT" | "COURSE";
};