import cs from 'classnames'
import Link from 'next/link'
import { useUser } from 'utils/user'
import LogoIcon from 'assets/logo-icon.svg'
import LogoType from 'assets/logo-type.svg'
import Button from 'components/Button'
import UserProfileMenu from 'components/UserProfileMenu'

export default function Header({ isHome }) {
  const { user, loading } = useUser()
  return (
    <div className={cs("relative px-6 mx-auto", { 'bg-white': !isHome })}>
      <div className="flex justify-between items-center py-2 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link href="/">
            <a className="flex">
              <LogoIcon width={50} height={50} className="mr-2" />
              <LogoType width={70} />
            </a>
          </Link>
        </div>
        <div className="-mr-2 -my-2 md:hidden">
          <button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
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
              <Link href="/api/signin">
                <a className="whitespace-nowrap text-base font-medium text-dark hover:text-gray-900">Sign in</a>
              </Link>
              <Button
                to="/api/signup"
                label="Sign up"
                className="ml-8 px-4 py-2"
              />
            </div>
          )
        }
      </div>
    </div>
  );
}