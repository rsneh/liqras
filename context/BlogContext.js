import { createContext } from 'react'

export const BlogContext = createContext()

const BlogContextProvider = ({ children, blog }) => {
  return (
    <BlogContext.Provider value={{ blog }}>
      {children}
    </BlogContext.Provider>
  )
}

export default BlogContextProvider