import Link from 'next/link'
import Image from 'next/image'
import { parseWebsite } from 'utils/helpers'

export default function PostAuthor({ author, blogSlug }) {
  const { name, picture, headline, website } = author
  const [websiteUrl, websiteLabel] = parseWebsite(website)
  return (
    <div className="flex items-center mt-5 bg-gray-100 rounded-xl p-8" dir="ltr">
      {picture && (
        <div className="flex-grow-0 flex-shrink-0">
          <Image
            height="130"
            width="130"
            className="inline-block h-32 w-32 rounded-full ring-2 ring-white"
            src={picture}
            alt=""
          />
        </div>
      )}
      <div className="mx-4">
        <Link href={`/${blogSlug}`}>
          <a className="text-gray-800">
            <h4 className="text-2xl font-bold">{name}</h4>
          </a>
        </Link>
        {headline && (
          <h5 className="font-light tracking-normal text-base">{headline}</h5>
        )}
        {websiteUrl && (
          <a
            href={websiteUrl}
            target="_blank"
            className="text-gray-500 leading-tight"
            rel="noopener noreferrer"
          >
            {websiteLabel}
          </a>
        )}
      </div>
    </div>
  )
}