import { useContext } from 'react'
import cs from 'classnames'
import Switch from 'components/inputs/Switch'
import { Button, AnchorButton } from 'components/Buttons'
import DateDifference from 'components/DateDifference'
import BlogPostFeatureImage from 'components/BlogPost/BlogPostFeatureImage'
import PostStatus from 'components/BlogPost/PostStatus'
import EditBlogPostSlug from 'components/BlogPost/EditBlogPostSlug'
import { isPublished } from 'utils/helpers'
import { PostContext } from 'context/PostContext'
import { POST_SET_AUTOSAVE, POST_SET_RTL } from 'actions/postReducer'
import SavingLoader from 'components/SavingLoader'
import DeletePost from './components/DeletePost'

export default function EditBlogSidebar({ styles, setSlug, onSavePostHandler, onPublishPostHandler, onDeletePostHandler }) {
  const {
    dispatch,
    state: {
      id,
      sys,
      loading,
      isRTL,
      slug,
      autoSave,
      featureImage
    }
  } = useContext(PostContext)

  const postIsPublished = isPublished(sys)

  const onClickPublishButton = (e) => {
    e.preventDefault()
    onPublishPostHandler(id)
  }

  const onClickDeleteButton = (e) => {
    e.preventDefault();
    onDeletePostHandler(id);
  }

  const onClickSaveButton = (e) => {
    e.preventDefault()
    onSavePostHandler()
  }

  const lastUpdatedAt = sys?.updatedAt && new Date(sys.updatedAt)
  return (
    <div className="flex flex-col flex-1 items-start justify-between">
      <div className={cs(styles.blogOptions, "w-full")}>
        <dl>
          <div className="px-4 pb-2 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-0">
            <dt className="text-sm font-medium text-gray-500">
              Status
            </dt>
            <dd className="mt-1 text-sm sm:mt-0">
              <PostStatus sys={sys} />
            </dd>
            <dt className="text-sm font-medium flex items-center text-gray-500">
              Feature Image
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
              <BlogPostFeatureImage postId={sys?.id} image={featureImage} />
            </dd>
          </div>
        </dl>
        <div className="px-4 pb-5 sm:px-0">
          <EditBlogPostSlug postId={sys?.id} slug={slug} setSlug={setSlug} />
        </div>
        <Switch
          id="post-input-rtl"
          label="Right-To-Left"
          checked={isRTL}
          setChecked={(checked) => dispatch({ type: POST_SET_RTL, payload: checked })}
        />
        <Switch
          id="post-input-autosave"
          label="Autosave"
          disabled={true}
          checked={autoSave}
          setChecked={(checked) => dispatch({ type: POST_SET_AUTOSAVE, payload: checked })}
        />
        <DeletePost onClickDeleteButton={onClickDeleteButton} />
      </div>
      <div className="flex flex-col w-full divide-y mt-auto">
        {lastUpdatedAt && (
          <div className="text-xs text-gray-500 py-2">
            Updated <DateDifference date={lastUpdatedAt} />
          </div>
        )}
        <div className={cs(styles.blogActions, "w-full flex justify-between py-2")}>
          {loading ? (
            <div className="flex flex-1 items-center px-5 py-2">
              <SavingLoader />
            </div>
          ) : (
            <>
              <div className="block">
                <Button
                  label="Save"
                  onClick={onClickSaveButton}
                  colorClass="text-black bg-silver"
                  className="submit-action self-end px-4 py-2"
                />
              </div>
              {!postIsPublished && (
                <div className="block">
                  <Button
                    label="Publish"
                    onClick={onClickPublishButton}
                    className="submit-action self-end px-4 py-2"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}