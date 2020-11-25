import Head from "next/head"
import { useRouter } from "next/router"
import { getSiteMetaData } from "../utils/helpers"

export default function LayoutHead({ title, description = "" }) {
  const { pathname } = useRouter()
  const siteMetadata = getSiteMetaData()
  const isHome = pathname === "/"
  const metaDescription = description || siteMetadata.description

  return (
    <Head>
      <title>
        {isHome ? (
          `${siteMetadata.title} - ${siteMetadata.description}`
        ) : (
            `${title} - ${siteMetadata.title}`
          )}
      </title>
      <meta name="description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={title} />
      <meta
        name="og:description"
        property="og:description"
        content={metaDescription}
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <link rel="icon" type="image/png" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
    </Head>
  )
}