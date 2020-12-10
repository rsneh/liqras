import Link from 'next/link'
import WritingIcon from 'assets/writing-icon.svg'

export default function PostsIsEmpty() {
  return (
    <div className="transition-all duration-150 flex flex-col w-full px-4">
      <div className="flex flex-col items-stretch min-h-full pb-4 mb-6 transition-all duration-150 bg-white rounded-lg shadow-lg hover:shadow-2xl">
        <div className="text-center px-6 py-4">
          <div className="py-8">
            <div className="mb-4">
              <WritingIcon className="inline-block fill-current text-gray-200 h-16 w-16" />
            </div>
            <p className="text-2xl text-gray-500 font-medium mb-1">No posts yet</p>
            <p className="text-gray-400 italic max-w-xs mx-auto mb-6 ">Start writing your thoughts.</p>
            <div>
              <Link href={`/blog/new`}>
                <a
                  className="ml-8 px-4 py-2 items-center justify-center inline-flex text-white text-base whitespace-nowrap border border-transparent rounded bg-primary hover:bg-dark"
                >Create post</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}