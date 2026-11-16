import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { incrementLikes } from "../../actions/blogs"

export const instant = false

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div style={{ marginBottom: "24px" }}>
        <div>
          <strong>Author: </strong>
          {blog.author}
        </div>
        <div>
          <strong>Url: </strong>
          {blog.url}
        </div>
        <div>
          <strong>Likes: </strong>
          {blog.likes}
        </div>
      </div>
      <form action={incrementLikes}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">Like</button>
      </form>
    </div>
  )
}

export default BlogPage