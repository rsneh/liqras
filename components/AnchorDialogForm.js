import { useState, useEffect } from 'react'
import { Button } from 'components/Buttons'
import Input from 'components/inputs/Input'

export default function AnchorDialogForm({ html, selection, updateHtml, onClose }) {
  const [text, setText] = useState('')
  const [link, setLink] = useState('')

  useEffect(() => {
    if (selection) {
      const { selectionStart, selectionEnd } = selection
      const textSelection = html.substring(selectionStart, selectionEnd)
      setText(textSelection)
    }
  }, [])

  const onClickSaveHandler = () => {
    updateHtml(html.replace(text, `<a href="${link}">${text}</a>`))
    onClose()
  }

  return (
    <div className="p-4 text-gray-500 w-full">
      <h2 className="md:w-1/3 max-w-sm">Insert Hyperlink</h2>
      <div className="my-5">
        <Input
          id="anchorText"
          name="text"
          label="Text"
          disabled={true}
          defaultValue={text}
        />
        <Input
          label="URL"
          name="link"
          value={link}
          id="anchorLink"
          onChange={({ target }) => setLink(target.value)}
          style={{ direction: 'ltr' }}
        />
        <div className="text-right">
          <Button
            label="Close"
            onClick={onClose}
            colorClass="text-black bg-silver"
            className="self-end px-4 py-2"
          />
          <Button
            label="Save"
            onClick={onClickSaveHandler}
            className="submit-action self-end px-4 py-2"
          />
        </div>
      </div>
    </div>
  )
}