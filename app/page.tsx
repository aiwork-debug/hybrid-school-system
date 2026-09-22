import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Course, Chapter, LiveClass, Enrollment, User } from "@prisma/client";

import Navbar from "./components/Navbar";
import Hero from "./components/Home/Hero";
import WhatWeOffer from "./components/WhatWeOffer";
import HowItWorks from "./components/Home/HowItWorks";
import PopularSubjects from "./components/Home/PopularSubjects";
import ForTeachers from "./components/Home/ForTeachers";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

// Custom types for relations to avoid 'any'
type TeacherCourse = Course & {
  chapters: Chapter[];
  liveClasses: LiveClass[];
};

type EnrolledCourseWithDetails = Enrollment & {
  course: Course & {
    teacher: User;
    chapters: Chapter[];
  };
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  const role = session?.user?.role; // "STUDENT", "TEACHER", or undefined

  // Explicit typing instead of 'any[]'
  let enrolledCourses: EnrolledCourseWithDetails[] = [];
  let teacherCourses: TeacherCourse[] = [];

  if (session && role === "STUDENT") {
    enrolledCourses = await prisma.enrollment.findMany({
      where: { studentId: session.user.id },
      include: {
        course: {
          include: { teacher: true, chapters: true },
        },
      },
    });
  } else if (session && role === "TEACHER") {
    teacherCourses = await prisma.course.findMany({
      where: { teacherId: session.user.id },
      include: { chapters: true, liveClasses: true },
    });
  }

  return (
    <main className="min-h-screen bg-white flex flex-col justify-between">
      <div>
        <Navbar />
        
        {/* Hero Section */}
        <Hero session={session} enrolledCount={enrolledCourses.length} teacherCoursesCount={teacherCourses.length} />
        
        <WhatWeOffer />
        <HowItWorks />
        <PopularSubjects />
        
        {/* ForTeachers Section */}
        <ForTeachers session={session} teacherCourses={teacherCourses} />
        
        <FAQ />
        <FinalCTA />
      </div>
      <Footer />
    </main>
  );
}