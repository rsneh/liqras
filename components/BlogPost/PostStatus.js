import { isDraft, isPublished, isChanged, isArchived } from 'utils/helpers'
import styles from './PostStatus.module.scss'

export default function PostStatus({ sys }) {
  const postIsDraft = isDraft(sys)
  const postIsChanged = isChanged(sys)
  const postIsPublished = isPublished(sys)
  const postIsArchived = isArchived(sys)
  return (
    <>
      {postIsDraft && (
        <span className={styles['is-draft']}>Draft</span>
      )}
      {postIsChanged && (
        <span className={styles['is-changed']}>Changed</span>
      )}
      {postIsPublished && (
        <span className={styles['is-published']}>Published</span>
      )}
      {postIsArchived && (
        <span className={styles['is-archived']}>Archived</span>
      )}
    </>
  )
}