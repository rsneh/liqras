import Image from 'next/image'

export default function AuthorSidebar({ author }) {
  const { name, picture } = author
  return (
    <div className="flex flex-shrink-0 px-2 pb-4 border-b sm:px-0 sm:pb-0 sm:flex-col sm:items-center sm:w-1/4 sm:border-b-0">
      <div className="overflow-hidden">
        {picture && (
          <Image
            height="130"
            width="130"
            className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
            src={picture}
            alt=""
          />
        )}
      </div>
      <div className="py-2 ml-3 flex-1 sm:ml-0 sm:text-center">
        <h3 className="text-2xl text-gray-800 font-bold">{name}</h3>
      </div>
    </div>
  )
}