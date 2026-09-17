import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const course = await prisma.course.findUnique({ where: { id } });
  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  try {
    await prisma.$transaction(async (tx) => {
      const chapters = await tx.chapter.findMany({
        where: { courseId: id },
        select: { id: true },
      });
      const chapterIds = chapters.map((c) => c.id);

      const liveClasses = await tx.liveClass.findMany({
        where: { courseId: id },
        select: { id: true },
      });
      const liveClassIds = liveClasses.map((l) => l.id);

      const recordedLectures = await tx.recordedLecture.findMany({
        where: { chapterId: { in: chapterIds } },
        select: { id: true },
      });
      const lectureIds = recordedLectures.map((l) => l.id);

      await tx.attendanceLog.deleteMany({
        where: {
          OR: [
            { liveClassId: { in: liveClassIds } },
            { recordedLectureId: { in: lectureIds } },
          ],
        },
      });
      await tx.recordedLecture.deleteMany({ where: { chapterId: { in: chapterIds } } });
      await tx.liveClass.deleteMany({ where: { courseId: id } });
      await tx.assignment.deleteMany({ where: { courseId: id } });
      await tx.enrollment.deleteMany({ where: { courseId: id } });
      await tx.chapter.deleteMany({ where: { courseId: id } });
      await tx.course.delete({ where: { id } });
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete course error:", err);
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
  }
}