import Head from 'next/head'
import Link from 'next/link'
import Header from 'components/Header'
import Page404Icon from 'assets/page-404-icon.svg'
import { AnchorButton } from 'components/Buttons'

export default function Custom404() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div id="layout" className="flex flex-col min-h-screen antialiased">
        <Header />
        <div className="flex flex-1 flex-col justify-center">
          <div className="my-0 mx-auto block relative md:w-1/4">
            <div className="opacity-75">
              <Page404Icon />
            </div>
            <div className="mt-10 text-center w-2/3 mx-auto md:w-full">
              <h1 className="text-4xl font-bold">Not Found</h1>
              <p className="text-black my-2">It seem that we can't find the page you're looking for.</p>
              <div className="mt-10">
                <Link href="/">
                  <AnchorButton
                    size="sm"
                    label="Take me Home page"
                    className="underline self-end px-4 py-2"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}