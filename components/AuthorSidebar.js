import Image from 'next/image'

export default function AuthorSidebar({ author }) {
  const { name, picture } = author
  return (
    <div className="w-28 mx-10 flex flex-col items-center">
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
      <h3 className="text-lg text-gray-800 font-medium py-2 ml-3">{name}</h3>
    </div>
  )
}