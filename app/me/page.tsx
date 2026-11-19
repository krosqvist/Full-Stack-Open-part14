import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { generateToken } from "../actions/users"

export const instant = false

const MePage = async () => {
  const session = await auth()

  if (!session?.user?.email) {
    redirect("/login")
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.username, session.user.email))

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 sm:p-10">
          <h1 className="text-3xl font-bold text-gray-900">
            My Profile
          </h1>

          <div className="mt-8 space-y-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Username</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {user.username}
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-900">
              API token
            </h2>

            {user.token ? (
              <div className="mt-4">
                <p className="mb-2 text-sm text-gray-500">
                  Current token:
                </p>

                <div className="break-all rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-800">
                  {user.token}
                </div>
              </div>
            ) : (
              <p className="mt-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
                You have not generated a token yet.
              </p>
            )}

            <form action={generateToken} className="mt-6">
              <button
                type="submit"
                className="w-full rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {user.token ? "Generate new token" : "Generate token"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MePage