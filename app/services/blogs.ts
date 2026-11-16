import { eq, sql } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"


export const getBlogs = async () => {
  return db.select().from(blogs)
}

export const addBlog = async (title: string, author: string, url: string, likes: number) => {
  await db.insert(blogs).values({ title, author, url, likes })
}

export const getBlogById = async (id: number) => {
  const result = await db.select().from(blogs).where(eq(blogs.id, id))
  return result[0]
}

export const likeBlog = async (id: number) => {
  await db.update(blogs).set({ likes: sql`${blogs.likes} + 1`, }).where(eq(blogs.id, id))  
}