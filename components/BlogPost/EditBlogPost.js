import { useContext, useEffect } from 'react'
import dynamic from 'next/dynamic'
import cs from 'classnames'
import styles from './EditBlogPost.module.scss'
import { PostContext } from 'context/PostContext'
import usePrevious from 'components/hooks/usePrevious'
import { updatePostOnServer, publishPostWithId } from 'actions/post'
import { POST_SET_LOADING, POST_SET_RESULT, POST_SET_BLOCKS, POST_SET_UPDATED } from 'actions/postReducer'

const EditorComponentWithNoSSR = dynamic(() => import('components/Editor'),
  { ssr: false }
)

const BlogSidebarComponentWithNoSSR = dynamic(() => import('components/BlogPost/EditBlogSidebar'),
  { ssr: false }
)

export default function EditBlogPost(props) {
  let updateTimer
  const {
    dispatch,
    state: {
      id,
      isRTL,
      autoSave,
      blocks,
      updated,
      loading
    }
  } = useContext(PostContext)

  const prevBlocks = usePrevious(blocks)
  const setLoading = (payload) => dispatch({ type: POST_SET_LOADING, payload })
  const setBlocks = (payload) => dispatch({ type: POST_SET_BLOCKS, payload })

  const onPublishPostHandler = async (id) => {
    setLoading(true)
    const result = await publishPostWithId(id)
    if (result) {
      dispatch({ type: POST_SET_RESULT, payload: result })
    }
  }

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

  useEffect(() => {
    if (!loading && prevBlocks && prevBlocks !== blocks && autoSave) {
      if (updated) dispatch({ type: POST_SET_UPDATED, payload: true })
      else {
        if (updateTimer) clearTimeout(updateTimer)
        updateTimer = setTimeout(() => {
          updatePost(blocks)
        }, 15000);
      }
    }
  }, [blocks, prevBlocks, loading, autoSave, updated])

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
          prevBlocks={prevBlocks}
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