import { useEffect, useState } from 'react'
import { Button } from 'components/Buttons'
import Input from 'components/inputs/Input'

export default function AnchorDialogForm({ blocks, setBlocks, selection, currentBlockId, onClose }) {
  const [text, setText] = useState('')
  const [link, setLink] = useState('')
  const [block, setBlock] = useState(null)

  const getTextSelection = (html) => {
    const { selectionStart, selectionEnd } = selection
    const textSelection = html.substring(selectionStart, selectionEnd)
    return textSelection
  }

  useEffect(() => {
    const thisBlock = blocks.find(b => b._id === currentBlockId)
    if (thisBlock) {
      const textSelection = getTextSelection(thisBlock.html)
      setBlock(thisBlock)
      setText(textSelection)
    }
  }, [])

  const onClickSaveHandler = () => {
    const index = blocks.map((b) => b._id).indexOf(currentBlockId)
    const textSelection = getTextSelection(block.html)
    let newHtml = block.html.replace(textSelection, `<a href="${link}">${textSelection}</a>`)
    let updatedBlocks = [...blocks]
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      html: newHtml
    }
    setBlocks(updatedBlocks)
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