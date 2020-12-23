import Image from 'next/image'
import Link from 'next/link'
import Layout from 'components/Layout'
import { useFetchUser } from 'utils/user'
import LayoutHead from 'components/LayoutHead'
import Feature1Icon from 'assets/feature1-icon.svg'
import Feature2Icon from 'assets/feature2-icon.svg'
import Feature3Icon from 'assets/feature3-icon.svg'
import SubscribeFormSection from 'components/SubscribeFormSection'

export default function Home() {
  const { user, loading } = useFetchUser()
  return (
    <>
      <LayoutHead />
      <Layout user={user} loading={loading}>
        <div className="relative bg-white overflow-hidden">
          <div className="relative max-w-7xl mx-auto z-10">
            <div className="max-w-7xl mx-auto my-10 sm:my-28 lg:my-60">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-dark sm:text-5xl md:text-7xl">
                  <span className="block inline">Welcome to</span>
                  <span className="block font-bold inline ml-2">Liqras!</span>
                </h1>
                <p className="mt-3 font-medium text-dark sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-2xl">
                  The place where thoughts become <span className="font-black">Words</span>
                </p>
                <div className="mx-auto mt-8 flex justify-center">
                  <a href="/api/signup" className="px-8 py-3 md:py-4 md:text-lg md:px-10 items-center justify-center inline-flex text-gray-800 font-medium whitespace-nowrap border border-transparent rounded bg-primary hover:bg-cream">Sign up</a>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 left-0 z-0 opacity-40">
            <Image
              width={2560}
              height={1707}
              src="/images/background-home.webp"
              style={{ objectFit: 'cover' }}
              layout="responsive"
              sizes="(max-width: 640px) 640px, (max-width: 1280px) 1920px, 2500px"
              alt=""
            />
          </div>
        </div>

        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto text-center py-14 lg:py-20">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mx-1 md:text-4xl">
              <span className="block text-primary font-bold">Publish your content, in your language to the world</span>
            </h2>
            <p className="text-1xl mx-auto my-3 w-10/12 md:text-2xl md:w-7/12 lg:w-6-12">Write your thoughts into words in your native language and publish them to the rest of the world.</p>
          </div>
        </div>

        <div className="py-12 bg-white max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center my-5">
            <div className="w-2/5 sm:w-1/4 px-3 text-center">
              <div className="p-5 xl:px-8 md:py-5">
                <div className="w-full max-w-xs">
                  <Feature1Icon />
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-2/4 px-3 text-left flex-grow md:flex-grow-0">
              <div className="p-5 xl:px-8 md:py-5">
                <h3 className="text-2xl text-gray-900 mb-2 font-bold">Optimize for your language</h3>
                <p>
                  The idea behind Liqras is to allow bloggers to write their blog posts in their native language without caring. It'll have a bad design or layout. Liqras' platform will optimize the design and layout by your language selection.
                  </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap flex-row-reverse items-center justify-center">
            <div className="w-2/5 sm:w-1/4 px-3 text-center">
              <div className="p-5 xl:px-8 md:py-5">
                <div className="w-full max-w-xs">
                  <Feature2Icon />
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-2/4 px-3 text-left flex-grow md:flex-grow-0">
              <div className="p-5 xl:px-8 md:py-5">
                <h3 className="text-2xl text-gray-900 mb-2 font-bold">Great performance and optimization</h3>
                <p>
                  We believe you probably will share your blog or posts on social networks, so we focus on optimizing the platform to do precisely this in the right way. The platform will automatically optimize SEO, images, and traffic to your blog.
                  </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap flex-row items-center justify-center">
            <div className="w-2/5 sm:w-1/4 px-3 text-center">
              <div className="p-5 xl:px-8 md:py-5">
                <div className="w-full max-w-xs">
                  <Feature3Icon />
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-2/4 px-3 text-left flex-grow md:flex-grow-0">
              <div className="p-5 xl:px-8 md:py-5">
                <h3 className="text-2xl text-gray-900 mb-2 font-bold">Open-Source project</h3>
                <p>
                  We believe you probably will share your blog or posts on social networks, so we focus on optimizing the platform to do precisely this in the right way. The platform will automatically optimize SEO, images, and traffic to your blog.
                  </p>
              </div>
            </div>
          </div>
        </div>
        <SubscribeFormSection />
      </Layout>
    </>
  )
}