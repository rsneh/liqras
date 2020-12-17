import Head from 'next/head'
import Posts from 'components/Posts'
import Layout from 'components/Layout'
import { useRouter } from 'next/router'
import Page404 from 'pages/404'
import LayoutHead from 'components/LayoutHead'
import PageLoading from 'components/PageLoading'
import AuthorSidebar from 'components/AuthorSidebar'
import BlogContextProvider from 'context/BlogContext'
import { fetchBlogBySlug, fetchBlogForIndex } from 'utils/contentful'

export default function BlogSlug({ blog }) {
  const router = useRouter()
  if (router.isFallback) {
    return <PageLoading />
  }

  if (!blog) {
    return (
      <Page404 statusCode={404} />
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