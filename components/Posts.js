import { useContext } from 'react'
import PostCard from 'components/PostCard'
import PostsIsEmpty from 'components/PostsIsEmpty'
import { BlogContext } from 'context/BlogContext'

export default function Posts({ allowEdit = false }) {
  const { blog } = useContext(BlogContext)
  const blogSlug = blog?.fields?.slug
  let { posts = [] } = blog?.fields
  const isEmpty = posts.length === 0
  // Filter only posts with fields
  posts = posts.filter(p => p.fields)
  return (
    <div className="flex-grow flex flex-col items-center space-y-4">
      {isEmpty ? (
        <PostsIsEmpty />
      ) : posts.map((post, idx) => {
        return (
          <PostCard key={idx} post={post} blogSlug={blogSlug} allowEdit={allowEdit} />
        )
      })}
    </div>
  )
}