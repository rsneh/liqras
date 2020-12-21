import auth0 from 'utils/auth0'
import { fetchBlogbyId } from 'utils/contentful'
import { convertAuthorId } from 'utils/helpers'
import Posts from 'components/Posts'
import Layout from 'components/Layout'
import LayoutHead from 'components/LayoutHead'
import AuthorSidebar from 'components/AuthorSidebar'
import BlogContextProvider from 'context/BlogContext'

// Show user's blog
export default function Blog({ user, blog }) {
  const { fields } = blog
  const { title, author, posts = [] } = fields
  return (
    <BlogContextProvider blog={blog}>
      <LayoutHead title={title} />
      <Layout user={user}>
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex flex-col py-2 my-10 sm:flex-row">
            <AuthorSidebar author={author} />
            <Posts posts={posts} allowEdit={true} />
          </div>
        </div>
      </Layout>
    </BlogContextProvider>
  )
}

export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req);
  const user = session?.user || null
  if (!user) {
    res.writeHead(302, {
      Location: '/api/signin'
    })
    res.end()
    return
  }

  const blogId = convertAuthorId(user.sub)
  const blog = await fetchBlogbyId(blogId, true)
  return {
    props: {
      blog,
      user
    }
  }
}