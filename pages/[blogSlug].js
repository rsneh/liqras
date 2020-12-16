import Head from 'next/head'
import DefaultErrorPage from 'next/error'
import { useRouter } from 'next/router'
import Posts from 'components/Posts'
import Layout from 'components/Layout'
import LayoutHead from 'components/LayoutHead'
import { fetchBlogBySlug, fetchBlogForIndex } from 'utils/contentful'
import AuthorSidebar from 'components/AuthorSidebar'
import BlogContextProvider from 'context/BlogContext'

export default function BlogSlug({ blog }) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if (!blog) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  }

  const { fields: { title, author } } = blog
  return (
    <BlogContextProvider blog={blog}>
      <LayoutHead title={title} />
      <Layout>
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex flex-row-reverse py-2 my-10">
            <AuthorSidebar author={author} />
            <Posts />
          </div>
        </div>
      </Layout>
    </BlogContextProvider>
  )
}

export async function getStaticPaths() {
  const res = await fetchBlogForIndex()
  const { blogs } = res
  const paths = blogs?.map(blog => {
    return {
      params: {
        blogSlug: blog.slug
      }
    }
  })
  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const { blog } = await fetchBlogBySlug(params.blogSlug)
  return {
    props: {
      blog
    },
    revalidate: 43200
  }
}

// export async function getServerSideProps({ query }) {
//   const { blogSlug } = query
//   if (!blogSlug) {
//     return {
//       notFound: true
//     }
//   }

//   const { blog } = await fetchBlogBySlug(blogSlug)
//   if (!blog) {
//     return {
//       notFound: true
//     }
//   }

//   return {
//     props: {
//       blog
//     }
//   }
// }