import { resetServerContext } from 'react-beautiful-dnd'
import LayoutHead from 'components/LayoutHead'
import Layout from 'components/Layout'
import auth0 from 'utils/auth0'
import BlogPost from 'components/BlogPost'
import { fetchPostPreviewById } from 'utils/contentful'

export default function Post({ user, post, error, loading = false }) {
  resetServerContext()
  const { sys } = post
  const id = sys?.id
  return (
    <>
      <LayoutHead title="New Post" />
      <Layout user={user} loading={loading} showFooter={false}>
        <div className="md:mx-auto max-w-6xl">
          <div className="mt-8">
            <BlogPost isNew={false} id={id} post={post} />
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps = async ({ req, query }) => {
  resetServerContext()
  const { id } = query
  if (typeof window === 'undefined') {
    try {
      const { user } = await auth0.getSession(req)
      const post = await fetchPostPreviewById(id)
      return {
        props: {
          post,
          user,
          error: false
        },
      };
    } catch (err) {
      console.log(err);
      return { props: { blocks: null, pid: null, error: true } };
    }
  }
};