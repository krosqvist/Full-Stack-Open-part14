"use client"

import { useActionState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { createBlog } from "../../actions/blogs"
import { useNotification } from "../../components/NotificationContext"

const initialState = {
  error: "",
  success: false,
  values: {
    title: "",
    author: "",
    url: "",
  },
}

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, initialState)
  const { showNotification } = useNotification()
  const router = useRouter()
  const hasRedirected = useRef(false)

  useEffect(() => {
    if (state.success && !hasRedirected.current) {
      hasRedirected.current = true
      showNotification("blog created")
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Create a new blog
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 sm:p-10">
          <form action={formAction} className="space-y-6">
            <div>
              <label
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                required
                minLength={5}
                defaultValue={state.values?.title}
                placeholder="Enter blog title"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Author
              </label>
              <input
                type="text"
                name="author"
                required
                minLength={5}
                defaultValue={state.values?.author}
                placeholder="Enter author name"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                URL
              </label>
              <input
                type="text"
                name="url"
                required
                minLength={5}
                defaultValue={state.values?.url}
                placeholder="Enter blog url"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            {state.error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {state.error}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-[0.99]"
            >
              Create Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewBlog
