import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Menu from 'components/Menu'
import BellIcon from 'assets/bell-icon.svg'
import PlusIcon from 'assets/plus-icon.svg'

export default function UserProfileMenu({ user }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="hidden md:block z-10">
      <div className="ml-4 flex items-center md:ml-6">
        <button className="p-1 rounded-full text-gray-500 hover:text-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" />
        </button>
        <Link href="/blog/new">
          <button className="p-1 ml-2 rounded-full text-gray-500 hover:text-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <span className="sr-only">New Post</span>
            <PlusIcon className="h-6 w-6" />
          </button>
        </Link>
        <div className="ml-2 relative">
          <div>
            <button
              onClick={(e) => setIsOpen(prev => !prev)}
              className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark focus:ring-dark" id="user-menu" aria-haspopup="true"
            >
              <span className="sr-only">Open user menu</span>
              {user?.picture && (
                <Image
                  height="32"
                  width="32"
                  className="rounded-full"
                  src={user.picture}
                  alt=""
                />
              )}
            </button>
          </div>
          <Menu isOpen={isOpen} setIsOpen={setIsOpen}>
            <Link href={`/blog`}>
              <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Blog</a>
            </Link>
            <Link href="/api/signout">
              <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
            </Link>
          </Menu>
        </div>
      </div>
    </div>
  )
}