import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  if (session.user.role !== "TEACHER") {
    return NextResponse.json({ error: "Only teachers can create courses" }, { status: 403 });
  }

  if (!session.user.subject) {
    return NextResponse.json({ error: "Set your subject first" }, { status: 400 });
  }

  const { title, description } = await req.json();

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const course = await prisma.course.create({
    data: {
      title,
      description: description || "",
      subject: session.user.subject,
      teacherId: session.user.id,
    },
  });

  return NextResponse.json(course, { status: 201 });
}