import cs from 'classnames'
import BlogPostHeader from './BlogPostHeader'
import PostContent from 'components/PostContent'
import { parseFeatureImageSource } from 'utils/helpers'
import styles from './styles.module.scss'

export default function BlogPost({ post, author }) {
  const {
    fields: {
      title,
      featureImage,
      options = {},
      content: postContent
    },
    sys: {
      createdAt
    }
  } = post
  const { isRTL } = options
  const postFeatureImageSrc = parseFeatureImageSource(featureImage)
  return (
    <div className={cs(styles['blog-post'], isRTL && styles['is-rtl'])}>
      <BlogPostHeader
        title={title}
        author={author}
        createdAt={createdAt}
        isRTL={isRTL}
        featureImage={postFeatureImageSrc}
      />
      <div className="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
        <PostContent blocks={postContent} />
      </div>
    </div>
  )
}