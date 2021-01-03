import cs from 'classnames'
import BlogPostHeader from './BlogPostHeader'
import PostContent from 'components/PostContent'
import PostAuthor from 'components/PostAuthor'
import { parseFeatureImageSource } from 'utils/helpers'
import styles from './styles.module.scss'

export default function BlogPost({ post, author, blogSlug }) {
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
    <div className={cs(styles['blog-post'], isRTL && styles['heb'], isRTL && styles['is-rtl'])}>
      <BlogPostHeader
        title={title}
        author={author}
        createdAt={createdAt}
        isRTL={isRTL}
        featureImage={postFeatureImageSrc}
      />
      <div className={cs(styles['content-container'], "px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed")}>
        <PostContent blocks={postContent} />
      </div>
      <div className={cs(styles['author'], "max-w-screen-md mx-auto")}>
        <PostAuthor author={author} blogSlug={blogSlug} />
      </div>
    </div>
  )
}