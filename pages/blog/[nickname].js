import { useRouter } from 'next/router'
import { useFetchUser } from 'utils/user'
import { fetchPosts } from 'utils/contentful'
import Layout from 'components/Layout'
import LayoutHead from 'components/LayoutHead'

export default function Blog({ posts }) {
  const router = useRouter()
  const { nickname } = router.query
  const { user, loading } = useFetchUser()

  console.log({ user });
  return (
    <>
      <LayoutHead title="Profile" />
      <Layout user={user} loading={loading}>
        <h1>Hello {nickname}</h1>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { nickname } = context.params
  const posts = await fetchPosts(nickname)
  return {
    props: {
      posts: []
    }
  }
}