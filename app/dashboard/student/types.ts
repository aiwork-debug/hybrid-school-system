export type LiveClassItem = {
  id: string;
  title: string;
  startTime?: Date;
  meetingUrl?: string | null;
  courseTitle: string;
};

export type EnrolledCourse = {
  id: string;
  title: string;
  description: string | null;
  subject: string;
  teacher: { name: string | null } | null;
  chapters: { id: string }[];
};

export type AvailableCourse = {
  id: string;
  title: string;
  description: string | null;
  subject: string;
  teacher: { name: string | null } | null;
  _count: { chapters: number };
};