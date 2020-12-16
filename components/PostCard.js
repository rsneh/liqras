import Image from 'next/image'
import Link from 'next/link'
import cs from 'classnames'
import { dateFormat, parseFeatureImageSource } from 'utils/helpers'
import PostContent from 'components/PostContent'
import PostReadingTime from 'components/PostReadingTime'
import EditIcon from 'assets/edit-icon.svg'
import styles from './PostCard.module.scss'

export default function PostCard({ blogSlug, post, allowEdit }) {
  const { sys, fields } = post
  const { title, featureImage, slug: postSlug, content: postContent } = fields
  const options = fields?.options || {}
  const { isRTL } = options
  const postId = sys?.id
  const postHref = `/${blogSlug}/${postSlug}-${postId}`
  const postFeatureImageSrc = parseFeatureImageSource(featureImage)
  return (
    <div className={cs(styles.postCard, "transition-all duration-150 flex flex-col w-full px-4", isRTL && styles['is-rtl'])}>
      <div className="flex flex-col items-stretch min-h-full pb-4 transition-all duration-150 bg-white rounded-lg shadow-lg hover:shadow-2xl">
        {postFeatureImageSrc && (
          <div className="relative">
            <Image
              layout="fill"
              src={postFeatureImageSrc}
              alt="Post Cover"
              className="object-center object-cover pointer-events-none rounded-lg rounded-b-none z-0 md:h-56"
            />
            <div className="lg:h-44"></div>
          </div>
        )}
        <div className="flex justify-between">
          <div className="flex flex-col justify-center flex-1 px-4 py-2">
            {title && (
              <Link href={postHref} className="hover:underline">
                <a className="text-2xl font-bold tracking-normal text-gray-800">
                  <h2>{title}</h2>
                </a>
              </Link>
            )}
            {sys?.createdAt && (
              <div className="text-xs text-gray-600">{dateFormat(new Date(sys.createdAt))}</div>
            )}
          </div>
          {allowEdit && (
            <div className="flex items-center px-4">
              <Link href={`/post/${postId}/edit`}>
                <a>
                  <EditIcon className="text-primary h-4 w-4" />
                </a>
              </Link>
            </div>
          )}
        </div>
        <div className={cs("w-full px-4 py-2 overflow-hidden text-sm")}>
          <PostContent blocks={postContent} first />
        </div>
        <hr className="border-gray-100" />
        <section className={cs("px-4 py-2 mt-2", styles.ltr)}>
          <div className="flex items-center justify-center">
            <Link href={postHref}>
              <a className="mt-1 text-xs">Read more - <PostReadingTime blocks={postContent} /></a>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}