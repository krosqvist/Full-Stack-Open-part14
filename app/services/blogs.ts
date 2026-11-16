const blogs = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    author: "John Doe",
    url: "https://nextjs.org/learn",
    likes: 15,
  },
  {
    id: 2,
    title: "Understanding React Server Components",
    author: "Jane Smith",
    url: "https://react.dev/reference/rsc/server-components",
    likes: 32,
  },
  {
    id: 3,
    title: "Static vs Dynamic Rendering in Next.js",
    author: "Alex Johnson",
    url: "https://nextjs.org/docs/app",
    likes: 8,
  },
]

let nextId = 4

export const getBlogs = () => {
  return blogs
}

export const addBlog = (title: string, author: string, url: string, likes: number) => {
  blogs.push({ id: nextId++, title, author, url, likes })
}

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id)
}

export const likeBlog = (id: number) => {
  const blog = blogs.find(b => b.id === id)

  if (blog) {
    blog.likes += 1
  }
}