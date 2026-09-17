import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "ahmeddropli2@gmail.com"; // apni pasand ka email
  const password = "Admin@12345";        // strong password rakhein, baad me change kar lena

  const hashed = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: { role: "ADMIN", roleSelected: true, password: hashed },
    create: {
      name: "Super Admin",
      email,
      password: hashed,
      role: "ADMIN",
      roleSelected: true,
    },
  });

  console.log("✅ Admin ready:", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });