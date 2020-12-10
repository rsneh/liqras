import { useRouter } from 'next/router'
import auth0 from 'utils/auth0'
import { fetchBlogbyId } from 'utils/contentful'
import { convertAuthorId } from 'utils/helpers'
import LayoutHead from 'components/LayoutHead'
import AuthorSidebar from 'components/AuthorSidebar'
import Layout from 'components/Layout'
import Posts from 'components/Posts'

// Show user's blog
export default function Blog({ user, blog }) {
  const { fields } = blog
  const { title, posts = [] } = fields
  return (
    <>
      <LayoutHead title={title} />
      <Layout user={user}>
        <div className="max-w-4xl mx-auto">
          <div className="flex py-2 my-10">
            <AuthorSidebar user={user} />
            <Posts posts={posts} />
          </div>
        </div>
      </Layout>
    </>
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