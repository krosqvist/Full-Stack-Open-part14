
import Link from "next/link"
import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { incrementLikes } from "../../actions/blogs"

export const instant = false

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">

        <Link
          href="/blogs"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition hover:text-indigo-800"
        >
          Back to blogs
        </Link>

        <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200">
          <div className="border-b border-gray-100 px-8 py-8 sm:px-10">

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {blog.title}
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              Written by {blog.author}
            </p>
          </div>

          <div className="space-y-6 px-8 py-8 sm:px-10">

            <div>
              <p className="mb-2 text-sm font-semibold text-gray-500">
                Author
              </p>
              <p className="text-lg font-medium text-gray-900">
                {blog.author}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-gray-500">
                Blog URL
              </p>
              <a
                href={blog.url}
                className="break-all text-indigo-600 underline decoration-indigo-300 underline-offset-4 transition hover:text-indigo-800"
              >
                {blog.url}
              </a>
            </div>

            <div className="rounded-xl bg-indigo-50 p-5">
              <p className="text-sm font-medium text-indigo-600">
                Likes
              </p>
              <p className="mt-1 text-3xl font-bold text-indigo-900">
                {blog.likes}
              </p>
            </div>

            <form action={incrementLikes}>
              <input type="hidden" name="id" value={blog.id} />

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-[0.99]"
              >
                Like this blog
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPage
