import Image from 'next/image'
import Link from 'next/link'
import cs from 'classnames'
import { dateFormat } from 'utils/helpers'
import PostContent from 'components/PostContent'
import styles from './PostCard.module.scss'

export default function PostCard({ post }) {
  const { sys, fields } = post
  const options = fields?.options || {}
  const { isRTL } = options
  const postHref = `/p/${sys.id}`
  return (
    <div className={cs(styles.postCard, "transition-all duration-150 flex flex-col w-full px-4", isRTL && styles['is-rtl'])}>
      <div className="flex flex-col items-stretch min-h-full pb-4 mb-6 transition-all duration-150 bg-white rounded-lg shadow-lg hover:shadow-2xl">
        {fields?.featureImage && (
          <div className="md:flex-shrink-0">
            <Image
              src={fields.featureImage}
              layout={"fill"}
              alt="Blog Cover"
              className="object-fill w-full rounded-lg rounded-b-none md:h-56"
            />
          </div>
        )}
        <div className="flex flex-col justify-center flex-1 px-4 py-2">
          {fields?.title && (
            <Link href={postHref} className="hover:underline">
              <h2 className="text-2xl font-bold tracking-normal text-gray-800">
                {fields.title}
              </h2>
            </Link>
          )}
          {sys?.createdAt && (
            <div className="text-xs text-gray-600">{dateFormat(new Date(sys.createdAt))}</div>
          )}
        </div>
        <div className={cs("w-full px-4 py-2 overflow-hidden text-sm")}>
          <PostContent blocks={fields?.content} first />
        </div>
        <hr className="border-gray-100" />
        <section className={cs("px-4 py-2 mt-2", styles.ltr)}>
          <div className="flex items-center justify-center">
            <Link href={postHref}>
              <a className="mt-1 text-xs">Read more - 9 minutes read</a>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}