import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import cs from 'classnames'
import { objectId } from 'utils/common'
import BlogSidebar from 'components/BlogPost/BlogSidebar'
import styles from './styles.module.scss'
import { updatePostOnServer } from 'actions/post'

export const initialBlocks = [{
  _id: objectId(),
  html: "Untitled",
  tag: "h1",
  imageUrl: ""
}]

const EditorComponentWithNoSSR = dynamic(() => import('components/Editor'),
  { ssr: false }
)

async function submitForm(e) {
  e.preventDefault()

  const res = await fetch('/api/profile/update', {
    body: JSON.stringify({
      hello: 'world'
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })

  const { error } = await res.json()
  console.log(error);
}

export default function BlogPost({ id, post, isNew }) {
  const [isRTL, setIsRTL] = useState(!!post?.fields?.isRTL)
  const [loading, setLoading] = useState(false)
  const fetchedBlocks = post?.fields?.content || initialBlocks
  const updatePost = useCallback(async (blocks) => {
    setLoading(true)
    const options = {
      isRTL
    }
    const result = await updatePostOnServer(id, blocks, options)
    if (result) {
      setLoading(false)
    }
  }, [])

  return (
    <div className={cs(styles.blogPostContainer, "md:flex")}>
      <main className={cs("mt-5 mx-3 md:mt-0 md:col-span-2 flex-grow", isRTL && styles["is-rtl"])}>
        <EditorComponentWithNoSSR
          isNew={isNew}
          fetchedBlocks={fetchedBlocks}
          id={id}
          isRTL={isRTL}
          updatePost={updatePost}
        />
      </main>
      <aside className="flex flex-col flex-none flex-none w-64 px-4 border-gray-100 bg-gray-50 border-l-2">
        <BlogSidebar
          styles={styles}
          isRTL={isRTL}
          setIsRTL={setIsRTL}
          post={post}
          loading={loading}
        />
      </aside>
    </div>
  )
}