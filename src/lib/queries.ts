"use server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/server";

export const getCurrentUser = async () => {
  const headersList = await headers();
  const result = await auth.api.getSession({ headers: headersList });
  return result?.user;
};

export const getCurrentSession = async () => {
  const headersList = await headers();
  const result = await auth.api.getSession({ headers: headersList });
  return result?.session;
};
