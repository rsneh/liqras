
import { useRouter } from 'next/router'
import auth0 from 'utils/auth0'
import { useFetchUser } from 'utils/user'
import { initialPost } from 'utils/contentful'
import LayoutHead from 'components/LayoutHead'
import Layout from 'components/Layout'

export default function BlogNewPost({ error }) {
  const router = useRouter()
  const { user, loading } = useFetchUser()

  if (!user && !loading) {
    router.replace('/')
  }

  return (
    <>
      <LayoutHead title="New Post" />
      <Layout user={user} loading={loading} showFooter={false}>
        <div className="md:w-full md:mx-auto max-w-6xl">
          <div className="mt-8">
            {error && (
              <h1>Error creating a new post.</h1>
            )}
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps = async ({ res, req }) => {
  if (typeof window === 'undefined') {
    const { user } = await auth0.getSession(req)
    try {
      const { id } = await initialPost(user)
      res.writeHead(302, { Location: `/p/${id}` })
      res.end()
      return { props: {} }
    } catch (err) {
      console.log(err)
      return { props: { error: true } }
    }
  }
}