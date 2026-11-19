import { db } from "@/db"
import { users, blogs } from "@/db/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
  const authorization = request.headers.get("Authorization")

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Missing or invalid token" },
      { status: 401 }
    )
  }

  const token = authorization.substring(7)

  const [user] = await db
    .select({
      id: users.id,
      username: users.username,
      name: users.name,
    })
    .from(users)
    .where(eq(users.token, token))

  if (!user) {
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    )
  }

  const createdBlogs = await db
    .select({
      author: blogs.author,
      title: blogs.title,
      url: blogs.url
    })
    .from(blogs)
    .where(eq(blogs.userId, user.id))

  return NextResponse.json({ ...user, createdBlogs })
}