import cs from 'classnames'
import Switch from 'components/inputs/Switch'
import Button from 'components/Button'
import BlogPostFeatureImage from 'components/BlogPost/BlogPostFeatureImage'
import { isDraft } from 'utils/helpers'

export default function BlogSidebar({ post, styles, loading, isRTL, setIsRTL }) {
  const postIsDraft = isDraft(post)
  return (
    <div className="flex flex-col items-start py-2 divide-y">
      <div className={cs(styles.blogOptions, "w-full py-2")}>
        <dl>
          <div className="px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-500">
              Status
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
              {postIsDraft && (
                'Draft'
              )}
            </dd>
            <dt className="text-sm font-medium flex items-center text-gray-500">
              Feature Image
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
              <BlogPostFeatureImage postId={post?.sys?.id} image={post?.fields?.featureImage} />
            </dd>
          </div>
        </dl>
        <Switch
          label="Right-To-Left"
          checked={isRTL}
          setChecked={setIsRTL}
        />
      </div>
      <div className={cs(styles.blogActions, "w-full py-2")}>
        <div className="block">
          <Button
            type="submit"
            label="Save"
            loading={loading}
            className="submit-action self-end px-4 py-2"
          />
        </div>
      </div>
    </div>
  )
}