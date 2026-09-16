import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "STUDENT") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Student ki enrollments nikalain
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId: session.user.id },
      select: { courseId: true },
    });

    const courseIds = enrollments.map((e) => e.courseId);

    // Un courses ki live classes fetch karein
    const liveClasses = await prisma.liveClass.findMany({
      where: {
        courseId: { in: courseIds },
        scheduledAt: { gte: new Date() }, // Sirf aane wali live classes
      },
      include: {
        course: { select: { title: true } },
        teacher: { select: { name: true } },
      },
      orderBy: { scheduledAt: "asc" },
    });

    return NextResponse.json(liveClasses, { status: 200 });
  } catch (error) {
    console.error("Error fetching live classes:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}