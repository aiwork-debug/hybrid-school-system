import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const VALID_SUBJECTS = [
  "MATH",
  "SCIENCE",
  "ENGLISH",
  "URDU",
  "COMPUTER_SCIENCE",
  "SOCIAL_STUDIES",
];

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  if (session.user.role !== "TEACHER") {
    return NextResponse.json({ error: "Only teachers can set a subject" }, { status: 403 });
  }

  const { subject } = await req.json();

  if (!VALID_SUBJECTS.includes(subject)) {
    return NextResponse.json({ error: "Invalid subject" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { subject },
  });

  return NextResponse.json({ subject });
}