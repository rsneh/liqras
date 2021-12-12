import Head from 'next/head'
import Header from 'components/Header'
import Page404Icon from 'assets/page-404-icon.svg'

export default function Custom404() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div id="layout" className="flex flex-col min-h-screen antialiased">
        <Header />
        <div className="flex flex-1 flex-col justify-center">
          <div className="my-0 mx-auto block relative max-w-sm md:w-1/3">
            <div className="opacity-75">
              <Page404Icon />
            </div>
            <div className="mt-10 text-center w-2/3 mx-auto md:w-full">
              <h1 className="text-4xl font-bold">Not Found</h1>
              <p className="text-black my-2">It seem that we can't find the page you're looking for.</p>
              <div className="mt-10">
                <a href="/" className="underline self-end px-4 py-2">Take me Home page</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}