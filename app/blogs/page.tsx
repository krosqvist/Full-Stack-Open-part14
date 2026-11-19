
import Link from "next/link"
import { getBlogs } from "../services/blogs"

export const instant = false

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter = "" } = await searchParams
  const allBlogs = await getBlogs()

  const blogs = [...allBlogs]
    .filter(blog =>
      blog.title.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => b.likes - a.likes)

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Blogs
            </h1>
          </div>
        </div>

        <div className="mb-8 rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
          <form
            action="/blogs"
            method="GET"
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="text"
              name="filter"
              defaultValue={filter}
              placeholder="Search blogs"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />

            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Search
            </button>

            {filter && (
              <Link
                href="/blogs"
                className="flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-600 transition hover:bg-gray-100"
              >
                Clear
              </Link>
            )}
          </form>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            {filter ? "Search results" : "All blog posts"}
          </h2>
        </div>

        <div className="grid gap-4">
          {blogs.map(blog => (
            <div
              key={blog.id}
              className="group rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div className="min-w-0">
                <Link
                  href={`/blogs/${blog.id}`}
                  className="text-xl font-bold text-gray-900 transition group-hover:text-indigo-600"
                >
                  {blog.title}
                </Link>

                <p className="mt-2 text-sm text-gray-500">
                  By {blog.author}
                </p>
              </div>

              <div className="flex shrink-0 items-center justify-between gap-4 sm:justify-end">
                <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
                  {blog.likes} likes
                </span>
              </div>

              </div>
            </div>
            ))}
        </div>

      </div>
    </div>
  )
}

export default Blogs
