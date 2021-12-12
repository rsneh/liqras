import Image from 'next/image'
import cs from 'classnames'
import { dateFormat, parseFeatureImageSource } from 'utils/helpers'
import PostContent from 'components/PostContent'
import PostReadingTime from 'components/PostReadingTime'
import EditIcon from 'assets/edit-icon.svg'
import styles from './PostCard.module.scss'

export default function PostCard({ blogSlug, post, allowEdit }) {
  const { sys, fields } = post;
  const { title, featureImage, slug: postSlug, content: postContent } = fields;
  const options = fields?.options || {};
  const { isRTL } = options;
  const postId = sys?.id;
  const postHref = `/${blogSlug}/${postSlug}-${postId}`;
  const postFeatureImageSrc = parseFeatureImageSource(featureImage);
  return (
    <div className={cs(styles.postCard, "transition-all duration-150 flex flex-col w-full sm:px-4", isRTL && styles['is-rtl'])}>
      <div className="flex flex-col items-stretch min-h-full pb-4 transition-all duration-150 bg-white shadow-lg sm:rounded-lg hover:shadow-2xl">
        {postFeatureImageSrc && (
          <div className="relative">
            <Image
              layout="fill"
              src={postFeatureImageSrc}
              alt="Post Cover"
              className="object-center object-cover pointer-events-none rounded-b-none z-0 sm:rounded-lg"
            />
            <div className="h-56"></div>
          </div>
        )}
        <div className="flex justify-between">
          <div className="flex-1 p-4 pb-0">
            {allowEdit && (
              <div className={isRTL ? "float-left" : "float-right"}>
                <a href={`/post/${postId}/edit`}>
                  <EditIcon className="text-primary h-4 w-4" />
                </a>
              </div>
            )}
            {title && (
              <a href={postHref} className="hover:underline">
                <h2 className="tracking-wider sm:leading-normal">{title}</h2>
              </a>
            )}
            {sys?.createdAt && (
              <div className="text-xs leading-loose text-gray-600">{dateFormat(new Date(sys.createdAt))}</div>
            )}
          </div>
        </div>
        {postContent && (
          <>
            <div className={cs("w-full px-4 py-2 overflow-hidden text-sm")}>
              <PostContent blocks={postContent} summary={true} />
            </div>
            <hr className="border-gray-100" />
            <section className={cs("px-4 py-2 mt-2", styles.ltr)}>
              <div className="flex items-center justify-center">
                <a href={postHref} className="mt-1 text-xs">Read more - <PostReadingTime blocks={postContent} /></a>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  )
}