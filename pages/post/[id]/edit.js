import { resetServerContext } from 'react-beautiful-dnd'
import LayoutHead from 'components/LayoutHead'
import Layout from 'components/Layout'
import auth0 from 'utils/auth0'
import EditBlogPost from 'components/BlogPost/EditBlogPost'
import { fetchPostPreviewById } from 'utils/contentful'
import PostContextProvider from 'context/PostContext'

export default function PostEdit({ user, post, error, loading = false }) {
  resetServerContext()
  return (
    <PostContextProvider fetchedPost={post}>
      <LayoutHead title={post?.fields?.title || "New Post"} />
      <Layout user={user} loading={loading} showFooter={false}>
        <div className="flex flex-1 md:w-full md:mx-auto max-w-6xl">
          <EditBlogPost />
        </div>
      </Layout>
    </PostContextProvider>
  )
}

export const getServerSideProps = async ({ req, res, query }) => {
  const session = await auth0.getSession(req);
  const user = session?.user || null
  if (!user) {
    return {
      redirect: {
        destination: '/api/signin',
        permanent: false,
      },
    };
  }

  resetServerContext();
  const { id } = query;
  if (typeof window === 'undefined') {
    try {
      const { user } = await auth0.getSession(req);
      const post = await fetchPostPreviewById(id);
      return {
        props: {
          post,
          user,
          error: false
        },
      };
    } catch (err) {
      if (err.name === 'NotFound') {
        return {
          notFound: true
        };
      }
      return { props: { blocks: null, pid: null, error: true } };
    }
  }
};