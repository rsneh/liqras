import Head from 'next/head'
import config from 'config'
import { useRouter } from 'next/router'
import { getSiteMetaData } from 'utils/helpers'

export default function LayoutHead({ title, description = "", image = null }) {
  const { pathname, asPath } = useRouter()
  const siteMetadata = getSiteMetaData()
  const isHome = pathname === "/"
  const metaDescription = description || siteMetadata.description
  const canonical = `${config.WEBSITE}${asPath}`
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
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:title" name="og:title" content={title} />
      {asPath && (
        <link rel="canonical" href={canonical} />
      )}
      <meta
        name="og:description"
        property="og:description"
        content={metaDescription}
      />
      {/** Image */}
      {image && (
        <>
          <meta property="og:image" content={`https:${image}?w=1200&h=627&fm=jpg&q=50`} />
          <meta name="twitter:image" content={`https:${image}?w=1200&h=627&fm=jpg&q=50`} />
        </>
      )}
      {/** Twitter section */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />

      {false && (
        <>
          <meta name="twitter:site" content="@ronsneh" />
          <meta name="twitter:creator" content="@ronsneh" />
        </>
      )}
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    </Head>
  )
}

