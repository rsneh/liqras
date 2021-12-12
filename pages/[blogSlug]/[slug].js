import Head from 'next/head'
import Layout from 'components/Layout'
import { useRouter } from 'next/router'
import DefaultErrorPage from 'next/error'
import { useFetchUser } from 'utils/user'
import BlogPost from 'components/BlogPost'
import LayoutHead from 'components/LayoutHead'
import PageLoading from 'components/PageLoading'
import { parsePostDescription } from 'utils/helpers'
import BlogContextProvider from 'context/BlogContext'
import { fetchBlogBySlug, fetchBlogForIndex } from 'utils/contentful'

export default function PostSlug({ blog, post }) {
  const router = useRouter()
  const { user, loading } = useFetchUser()

  if (router.isFallback) {
    return <PageLoading />
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

  const { fields: { title: blogTitle, slug: blogSlug, author } } = blog
  const { fields: { title: postTitle, content: blocks, featureImage, options: postOptions } } = post
  const title = `${postTitle} - ${blogTitle}`
  const description = parsePostDescription(blocks)
  const featureImageUrl = featureImage?.fields?.file?.url
  return (
    <BlogContextProvider blog={blog}>
      <LayoutHead title={title} description={description} image={featureImageUrl} isRTL={postOptions?.isRTL} />
      <Layout user={user} loading={loading}>
        <div className="md:w-full md:mx-auto max-w-6xl">
          <BlogPost post={post} author={author} blogSlug={blogSlug} />
        </div>
      </Layout>
    </BlogContextProvider>
  )
}

export async function getStaticPaths() {
  const res = await fetchBlogForIndex();
  const { blogs } = res;
  const paths = blogs?.reduce((paths, blog) => {
    blog?.posts?.forEach(post => {
      if (!blog.slug || !post.fields) return
      paths.push({
        params: {
          blogSlug: blog.slug,
          slug: post.fields?.slug
        }
      })
    });
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

  if (!post || !post?.fields) {
    return {
      notFound: true
    }
  }

  //TODO: check for redirects

  return {
    props: {
      blog,
      post
    },
    revalidate: (60 * 60) // an hour
  }
}