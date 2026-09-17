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

  const target = await prisma.user.findUnique({ where: { id } });
  if (!target) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  if (target.role === "ADMIN") {
    return NextResponse.json(
      { error: "Cannot delete an admin account" },
      { status: 403 }
    );
  }

  try {
    await prisma.$transaction(async (tx) => {
      // --- Student-side cleanup (no-op agar student nahi hai) ---
      await tx.attendanceLog.deleteMany({ where: { studentId: id } });
      await tx.enrollment.deleteMany({ where: { studentId: id } });

      // --- Teacher-side cleanup (no-op agar teacher nahi hai) ---
      const courses = await tx.course.findMany({
        where: { teacherId: id },
        select: { id: true },
      });
      const courseIds = courses.map((c) => c.id);

      const chapters = await tx.chapter.findMany({
        where: { courseId: { in: courseIds } },
        select: { id: true },
      });
      const chapterIds = chapters.map((c) => c.id);

      const liveClasses = await tx.liveClass.findMany({
        where: {
          OR: [{ courseId: { in: courseIds } }, { teacherId: id }],
        },
        select: { id: true },
      });
      const liveClassIds = liveClasses.map((l) => l.id);

      const recordedLectures = await tx.recordedLecture.findMany({
        where: {
          OR: [{ chapterId: { in: chapterIds } }, { teacherId: id }],
        },
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
      await tx.recordedLecture.deleteMany({ where: { id: { in: lectureIds } } });
      await tx.liveClass.deleteMany({ where: { id: { in: liveClassIds } } });
      await tx.assignment.deleteMany({ where: { courseId: { in: courseIds } } });
      await tx.enrollment.deleteMany({ where: { courseId: { in: courseIds } } });
      await tx.chapter.deleteMany({ where: { courseId: { in: courseIds } } });
      await tx.course.deleteMany({ where: { teacherId: id } });

      // --- Ab user delete safe hai ---
      await tx.user.delete({ where: { id } });
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete user error:", err);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}