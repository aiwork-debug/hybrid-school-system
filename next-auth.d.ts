// File: next-auth.d.ts
import { Role, Subject } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: Role;
    roleSelected: boolean;
    subject?: Subject | null;
  }

  interface Session {
    user: {
      id: string;
      role: Role;
      roleSelected: boolean;
      subject?: Subject | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    roleSelected: boolean;
    subject?: Subject | null;
  }
}