"use server"

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, likeBlog } from "../services/blogs"

export const createBlog = async (
  prevState: {
    error: string
    values: {
      title: string
      author: string
      url: string
    }
  },
  formData: FormData
) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string
  const likes = Number(formData.get("likes"))
  const values = { title, author, url }

  if (!title || title.length < 5) {
    return { error: "Blog title must be at least 5 characters long", values }
  }
  if (!author || author.length < 5) {
    return { error: "Blog author must be at least 5 characters long", values }
  }
  if (!url || url.length < 5) {
    return { error: "Blog url must be at least 5 characters long", values }
  }

  await addBlog(title, author, url, likes)

  revalidatePath("/blogs")
  redirect("/blogs")
}

export const incrementLikes = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  if (!Number.isInteger(id)) {
    throw new Error("Invalid blog ID")
  }
  await likeBlog(id)

  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}