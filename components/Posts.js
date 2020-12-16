import { useContext } from 'react'
import PostCard from 'components/PostCard'
import PostsIsEmpty from 'components/PostsIsEmpty'
import { BlogContext } from 'context/BlogContext'

export default function Posts({ allowEdit = false }) {
  const { blog } = useContext(BlogContext)
  const blogSlug = blog?.fields?.slug
  const { posts = [] } = blog?.fields
  const isEmpty = posts.length === 0
  return (
    <div className="flex-grow flex flex-col items-center">
      {isEmpty ? (
        <PostsIsEmpty />
      ) : posts.map((post, idx) => (
        <PostCard key={idx} post={post} blogSlug={blogSlug} allowEdit={allowEdit} />
      ))}
    </div>
  )
}