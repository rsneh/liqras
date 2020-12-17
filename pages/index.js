import Image from 'next/image'
import { useFetchUser } from 'utils/user'
import Layout from 'components/Layout'
import LayoutHead from 'components/LayoutHead'
import { Button } from 'components/Buttons'

export default function Home() {
  const { user, loading } = useFetchUser()
  return (
    <>
      <LayoutHead />
      <Layout user={user} loading={loading}>
        <div className="relative bg-white overflow-hidden">
          <div className="relative max-w-7xl mx-auto z-10">
            <div className="max-w-7xl mx-auto my-10 sm:my-28 lg:my-72">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-dark sm:text-5xl md:text-6xl">
                  <span className="block inline">Welcome to</span>
                  <span className="block font-bold inline ml-2">Liqras!</span>
                </h1>
                <p className="mt-3 text-base text-dark sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                  The place where thoughts become <span className="font-bold">Words</span>
                </p>
                <div className="mx-auto mt-8 flex justify-center">
                  <Button
                    to="#"
                    label="Get started"
                    className="px-8 py-3 md:py-4 md:text-lg md:px-10"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 left-0 z-0 opacity-30">
            <Image
              width={3840}
              height={2560}
              src="/images/background-home.jpg"
              style={{ objectFit: 'cover' }}
              layout="responsive"
              alt=""
            />
          </div>
        </div>

        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="mt-2 text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-3xl">Publish your content, in your language to the world</p>
              <p className="mt-4 text-xl text-gray-500 md:w-2/4 md:mx-auto">
                Write your thoughts into words in your native language and publish them to the rest of the world.
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                <div className="flex flex-col items-center">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      Competitive exchange rates
            </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
            </dd>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      No hidden fees
            </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
            </dd>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      Transfers are instant
            </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
            </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 bg-opacity-60 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="mt-2 text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-3xl">Publish your content, in your language to the world</p>
              <p className="mt-4 text-xl text-gray-500 md:w-2/4 md:mx-auto">
                Write your thoughts into words in your native language and publish them to the rest of the world.
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                <div className="flex flex-col items-center">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      Competitive exchange rates
            </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
            </dd>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      No hidden fees
            </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
            </dd>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      Transfers are instant
            </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
            </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
