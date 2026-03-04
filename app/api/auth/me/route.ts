import { NextResponse } from "next/server";
import { mockUsers } from "@/mock/users";

export async function GET() {
  // In a real app, verify token from headers/cookies.
  // For mock demo, if this endpoint is hit, return the mock admin user.
  const user = mockUsers.find(u => u.email === 'admin@smri.com') || mockUsers[0];
  
  if (!user) {
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });
  }
  
  return NextResponse.json(user);
}
