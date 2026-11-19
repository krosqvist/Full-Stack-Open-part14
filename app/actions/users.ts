"use server"

import { redirect } from "next/navigation"
import { auth } from "@/auth"
import bcrypt from "bcryptjs"
import { db } from "../../db"
import { users } from "../../db/schema"
import { getUser } from '../services/users'
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const registerUser = async (
  prevState: {
    error: string
    values: {
      username: string
      name: string
    }
  },
  formData: FormData
) => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordConfirm") as string
  const values = { username, name }

  if (!username || username.length < 4) {
    return { error: "Username must be at least 4 characters long", values }
  }

  if (!name) {
    return { error: "Name is required", values }
  }

  if (!password || password.length < 4) {
    return { error: "Password must be at least 4 characters long", values }
  }

  if (password !== passwordConfirm) {
    return { error: "Passwords do not match", values }
  }

  const existingUser = await getUser(username)

  if (existingUser) {
    return { error: "Username is already taken", values }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  redirect("/login")
}

export const generateToken = async () => {
  const session = await auth()

  if (!session?.user?.email) {
    throw new Error("Unauthorized")
  }

  const token = crypto.randomUUID()

  await db
    .update(users)
    .set({ token })
    .where(eq(users.username, session.user.email))

  revalidatePath("/me")
}