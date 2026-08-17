import { create } from 'zustand'
import blogService from '../services/blogs'

export const useBlogStore = create((set) => ({
  blogs: [],
  actions: {
    setBlogs: (blogs) => set(() => ({ blogs })),

    addBlog: async (newBlog) => {
      const savedBlog = await blogService.createNew(newBlog)
      set((state) => ({ blogs: [...state.blogs, savedBlog] }))
    },

    removeBlog: async (blogToRemove) => {
      await blogService.remove(blogToRemove.id)

      set((state) => ({
        blogs: state.blogs.filter((blog) => blog.id !== blogToRemove.id),
      }))
    },

    incrementLikes: async (blogToUpdate) => {
      const { id } = blogToUpdate
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
      }

      await blogService.update(id, {
        ...updatedBlog,
        user: updatedBlog.user.id,
      })

      set((state) => ({
        blogs: state.blogs.map((blog) => {
          if (blog.id === id) {
            return updatedBlog
          }
          return blog
        }),
      }))
    },

    addComment: async (id, comment) => {
      const result = await blogService.addComment(id, { comment })

      set((state) => ({
        blogs: state.blogs.map((blog) => {
          if (blog.id === id) {
            return {
              ...blog,
              comments: result.comments,
            }
          }
          return blog
        }),
      }))
    },
  },
}))

export const useBlogs = () =>
  useBlogStore((state) => state.blogs).toSorted((a, b) => b.votes - a.votes)

export const useBlogActions = () => useBlogStore((state) => state.actions)
