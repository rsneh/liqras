import cs from 'classnames'
import Image from 'next/image'
import { dateFormat } from 'utils/helpers'
import styles from './BlogPostHeader.module.scss'

export default function BlogPostHeader({ title, author, featureImage, createdAt, isRTL }) {
  const { name, picture } = author
  return (
    <div className="h-96 mb-4 md:mb-0 mx-auto py-72 relative w-full">
      <div className={cs("absolute left-0 bottom-0 w-full h-full z-10", styles['blog-post-header-bg-gradient'])}></div>
      {featureImage && (
        <Image
          layout="fill"
          src={featureImage}
          alt="Post Cover"
          className="absolute left-0 top-0 w-full h-full z-0 object-cover"
        />
      )}
      <div className={cs("p-4 w-full absolute bottom-0 z-10", isRTL ? 'right-0' : 'left-0')}>
        <div className="max-w-screen-md mx-auto">
          <h1 className="text-4xl font-semibold text-gray-100 leading-tight">
            {title}
          </h1>
          <div className="flex mt-3">
            {picture && (
              <Image
                src={picture}
                width="40"
                height="40"
                className="rounded-full object-cover"
              />
            )}
            <div className={`text-gray-200 m${isRTL ? 'r' : 'l'}-2`}>
              <p className="font-semibold text-sm">{name}</p>
              <p className="font-semibold text-xs">{dateFormat(new Date(createdAt))}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}