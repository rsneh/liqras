import PostCard from 'components/PostCard'
import PostsIsEmpty from 'components/PostsIsEmpty'

export default function Posts({ posts, showAll }) {
  const isEmpty = posts.length === 0
  return (
    <div className="flex-grow flex flex-col items-center">
      {isEmpty ? (
        <PostsIsEmpty />
      ) : posts.map((post, idx) => (
        <PostCard key={idx} post={post} />
      ))}
    </div>
  )
}