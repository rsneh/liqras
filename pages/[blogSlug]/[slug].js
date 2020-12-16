import Head from 'next/head'
import DefaultErrorPage from 'next/error'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import LayoutHead from 'components/LayoutHead'
import { fetchBlogBySlug, fetchBlogForIndex } from 'utils/contentful'
import BlogContextProvider from 'context/BlogContext'
import BlogPost from 'components/BlogPost'
import { useFetchUser } from 'utils/user'

export default function PostSlug({ blog, post }) {
  const router = useRouter()
  const { user, loading } = useFetchUser()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if (!blog || !post) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  }

  const { fields: { title: blogTitle, author } } = blog
  const { fields: { title: postTitle } } = post
  const title = `${postTitle} - ${blogTitle}`
  return (
    <BlogContextProvider blog={blog}>
      <LayoutHead title={title} />
      <Layout user={user} loading={loading}>
        <div className="md:w-full md:mx-auto max-w-6xl">
          <BlogPost post={post} author={author} />
        </div>
      </Layout>
    </BlogContextProvider>
  )
}

export async function getStaticPaths() {
  const res = await fetchBlogForIndex()
  const { blogs } = res
  const paths = blogs?.reduce((paths, blog) => {
    blog?.posts?.forEach(post => {
      paths.push({
        params: {
          blogSlug: blog.slug,
          slug: post?.fields?.slug
        }
      })
    })
    return paths
  }, [])
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const { blog } = await fetchBlogBySlug(params?.blogSlug)
  const postId = params?.slug?.split('-').slice(-1).pop()

  let post;
  if (blog && postId) {
    post = blog?.fields?.posts.find(p => p.sys?.id === postId)
  }

  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      blog,
      post
    },
    revalidate: 1
  }
}