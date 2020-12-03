import { useState } from 'react'
import dynamic from 'next/dynamic'
import cs from 'classnames'
import Switch from 'components/inputs/Switch'
import Button from 'components/Button'
import { objectId } from 'utils/common'
import styles from './styles.module.scss'

const initialBlocks = [{
  _id: objectId(),
  html: "Title...",
  tag: "h1",
  imageUrl: "",
  placeholder: true,
  isTyping: false
}, {
  _id: objectId(),
  html: "Start write your thoughts...",
  tag: "p",
  imageUrl: "",
  placeholder: true,
  isTyping: false
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

export default function BlogPost({ post, isNew }) {
  const [isRTL, setIsRTL] = useState(false)
  return (
    <div className={cs(styles.blogPostContainer, isRTL && styles["is-rtl"], "md:flex")}>
      <main className="mt-5 md:mt-0 md:col-span-2 flex-grow">
        <form action="#" method="POST" onSubmit={submitForm}>
          <EditorComponentWithNoSSR isNew={true} fetchedBlocks={initialBlocks} id={'NEW_POST'} isRTL={isRTL} />
        </form>
      </main>
      <aside className="flex flex-col flex-none flex-none w-60 mx-8">
        <div className="flex flex-col items-start py-2 divide-y">
          <div className={cs(styles.blogOptions, "py-2")}>
            Data
          </div>
          <div className={cs(styles.blogActions, "py-2")}>
            <Switch
              label="Right-To-Left"
              checked={isRTL}
              setChecked={setIsRTL}
            />
            <Button
              type="submit"
              label="Save"
              className="submit-action self-end px-4 py-2"
            />
          </div>
        </div>
      </aside>
    </div>
  )
}