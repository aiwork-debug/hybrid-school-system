"use server";

import fs from "fs/promises";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addChapter(courseId: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "TEACHER") {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  if (!title) return;

  const lastChapter = await prisma.chapter.findFirst({
    where: { courseId },
    orderBy: { order: "desc" },
  });

  const order = lastChapter ? lastChapter.order + 1 : 1;

  await prisma.chapter.create({
    data: {
      title,
      order,
      courseId,
    },
  });

  revalidatePath(`/dashboard/teacher/courses/${courseId}`);
}

export async function deleteChapter(chapterId: string, courseId: string) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "TEACHER") {
    throw new Error("Unauthorized");
  }

  await prisma.chapter.delete({
    where: { id: chapterId },
  });

  revalidatePath(`/dashboard/teacher/courses/${courseId}`);
}

export async function addRecordedLecture(chapterId: string, courseId: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "TEACHER") {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  if (!title) return;

  const descriptionVal = formData.get("description");
  const description = typeof descriptionVal === "string" && descriptionVal.trim() !== "" ? descriptionVal : null;

  const durationStr = formData.get("durationMins");
  const durationMins = typeof durationStr === "string" && durationStr.trim() !== "" ? parseInt(durationStr, 10) : null;

  async function saveFile(fileEntry: FormDataEntryValue | null): Promise<string | null> {
    if (!fileEntry || !(fileEntry instanceof File) || fileEntry.size === 0) return null;

    const bytes = await fileEntry.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${fileEntry.name.replaceAll(" ", "_")}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");

    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, fileName), buffer);

    return `/uploads/${fileName}`;
  }

  const videoUrl = await saveFile(formData.get("videoFile"));
  const slidesUrl = await saveFile(formData.get("slidesFile"));

  await prisma.recordedLecture.create({
    data: {
      title,
      description,
      videoUrl: videoUrl || "",
      slidesUrl: slidesUrl || null,
      durationMins,
      chapterId,
      teacherId: session.user.id,
    },
  });

  revalidatePath(`/dashboard/teacher/courses/${courseId}`);
}

export async function deleteLecture(lectureId: string, courseId: string) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "TEACHER") {
    throw new Error("Unauthorized");
  }

  await prisma.recordedLecture.delete({
    where: { id: lectureId },
  });

  revalidatePath(`/dashboard/teacher/courses/${courseId}`);
}

// ---- LIVE CLASS ACTIONS ----
export async function scheduleLiveClass(courseId: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "TEACHER") {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const meetingUrl = formData.get("meetingUrl") as string;
  const scheduledAt = formData.get("scheduledAt") as string;

  if (!title || !meetingUrl || !scheduledAt) return;

  await prisma.liveClass.create({
    data: {
      title,
      meetingUrl,
      scheduledAt: new Date(scheduledAt),
      courseId,
      teacherId: session.user.id, // Add this line to satisfy Prisma's requirement
    },
  });

  revalidatePath(`/dashboard/teacher/courses/${courseId}`);
}

export async function deleteLiveClass(liveClassId: string, courseId: string) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "TEACHER") {
    throw new Error("Unauthorized");
  }

  await prisma.liveClass.delete({
    where: { id: liveClassId },
  });

  revalidatePath(`/dashboard/teacher/courses/${courseId}`);
}