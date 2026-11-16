import { eq, sql } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"
import { notFound } from "next/navigation"

export const getBlogs = async () => {
  return db.select().from(blogs)
}

export const addBlog = async (title: string, author: string, url: string, likes: number) => {
  const user = await db.query.blogs.findFirst({
    orderBy: sql`RANDOM()`,
  })

  if (!user) {
    notFound()
  }

  await db.insert(blogs).values({ title, author, url, likes, userId: user.id })
}

export const getBlogById = async (id: number) => {
  const result = await db.select().from(blogs).where(eq(blogs.id, id))
  return result[0]
}

export const likeBlog = async (id: number) => {
  await db.update(blogs).set({ likes: sql`${blogs.likes} + 1`, }).where(eq(blogs.id, id))  
}