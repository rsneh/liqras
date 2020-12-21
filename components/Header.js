import Link from 'next/link'
import cs from 'classnames'
import { useState } from 'react'
import { useUser } from 'utils/user'
import LogoIcon from 'assets/logo-icon.svg'
import LogoType from 'assets/logo-type.svg'
import UserProfileMenu from 'components/UserProfileMenu'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, loading } = useUser()
  return (
    <div className="relative px-6 bg-silver sticky top-0 z-20">
      <div className="flex justify-between items-center py-2 md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link href="/">
            <a className="flex">
              <span className="sr-only">Home</span>
              <LogoIcon width={50} height={50} className="mr-2" />
              <LogoType width={70} height={50} />
            </a>
          </Link>
        </div>
        <div className="-mr-2 -my-2 md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(prev => !prev)}
            className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span className="sr-only">Open menu</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {user ? (
          <UserProfileMenu user={user} />
        ) : (
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <a href="/api/signin" className="whitespace-nowrap text-base font-medium text-dark hover:text-gray-900">Sign in</a>
              <a href="/api/signup" className="ml-8 px-4 py-2 items-center justify-center inline-flex text-gray-800 font-medium whitespace-nowrap border border-transparent rounded bg-primary hover:bg-cream">Sign up</a>
            </div>
          )
        }
      </div>
      <div className={cs("md:hidden", isOpen ? "block" : "hidden")}>
        <div className="px-2 pt-4 pb-3 space-y-1 sm:px-3">
          <a href="/api/signup" className="bg-primary block border border-transparent px-4 py-2 rounded text-white text-center">Sign up</a>
          <a href="/api/signin" className="block border border-transparent px-4 py-2 rounded text-dark text-center">Sign in</a>
        </div>
      </div>
    </div>
  );
}