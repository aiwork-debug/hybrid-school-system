import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "TEACHER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, scheduledAt, courseId, meetingUrl } = await req.json();

    const liveClass = await prisma.liveClass.create({
      data: {
        title,
        scheduledAt: new Date(scheduledAt),
        courseId,
        meetingUrl,
        teacherId: session.user.id, // Schema requirement ke mutabiq teacherId zaroori hai
      },
    });

    return NextResponse.json(liveClass, { status: 201 });
  } catch (error) {
    console.error("Error creating live class:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}