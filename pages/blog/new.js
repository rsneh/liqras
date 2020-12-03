import { resetServerContext } from 'react-beautiful-dnd'
import { useRouter } from 'next/router'
import { useFetchUser } from 'utils/user'
import LayoutHead from 'components/LayoutHead'
import Layout from 'components/Layout'
import BlogPost from 'components/BlogPost'

export default function BlogNewPost() {
  resetServerContext()
  const router = useRouter()
  const { user, loading } = useFetchUser()

  if (!user && !loading) {
    router.replace('/')
  }

  return (
    <>
      <LayoutHead title="New Post" />
      <Layout user={user} loading={loading} showFooter={false}>
        <div className="md:mx-auto max-w-6xl">
          <div className="mt-8">
            <BlogPost isNew={true} />
          </div>
        </div>
      </Layout>
    </>
  )
}