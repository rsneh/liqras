import { useContext, useCallback } from 'react'
import dynamic from 'next/dynamic'
import cs from 'classnames'
import { updatePostOnServer, publishPostWithId } from 'actions/post'
import styles from './EditBlogPost.module.scss'
import { PostContext } from 'context/PostContext'
import { POST_SET_LOADING, POST_SET_RESULT, POST_SET_BLOCKS } from 'actions/postReducer'


const EditorComponentWithNoSSR = dynamic(() => import('components/Editor'),
  { ssr: false }
)

const BlogSidebarComponentWithNoSSR = dynamic(() => import('components/BlogPost/EditBlogSidebar'),
  { ssr: false }
)

export default function EditBlogPost(props) {
  const {
    dispatch,
    state: {
      id,
      isRTL,
      autoSave,
      blocks
    }
  } = useContext(PostContext)

  const setLoading = (payload) => dispatch({ type: POST_SET_LOADING, payload })
  const setBlocks = (payload) => dispatch({ type: POST_SET_BLOCKS, payload })
  const updatePost = async () => {
    setLoading(true)
    const options = {
      isRTL
    }
    const result = await updatePostOnServer(id, blocks, options)
    if (result) {
      dispatch({ type: POST_SET_RESULT, payload: result })
    }
  }

  const onPublishPostHandler = async (id) => {
    setLoading(true)
    const result = await publishPostWithId(id)
    if (result) {
      dispatch({ type: POST_SET_RESULT, payload: result })
    }
  }

  return (
    <div className={cs(styles.blogPostContainer, "md:flex md:flex-1 md:w-full")}>
      <main className={cs("mt-5 mx-3 md:mt-0 md:col-span-2 flex-grow", isRTL && styles["is-rtl"])}>
        <EditorComponentWithNoSSR
          id={id}
          isRTL={isRTL}
          blocks={blocks}
          autoSave={autoSave}
          setBlocks={setBlocks}
          updatePost={updatePost}
        />
      </main>
      <aside className={cs(styles.sideBarContainer, "w-64 flex flex-col h-screen px-4 border-gray-100 bg-gray-50 border-l-2 p-8 justify-between sticky top-16")}>
        <BlogSidebarComponentWithNoSSR
          styles={styles}
          onPublishPostHandler={onPublishPostHandler}
          onSavePostHandler={updatePost}
        />
      </aside>
    </div>
  )
}