import cs from 'classnames'
import { useState, useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { objectId } from 'utils/common'
import EditableBlock from 'components/EditableBlock'
import usePrevious from './hooks/usePrevious'
import { setCaretToEnd } from 'components/EditableBlock/utils'
import styles from './Editor.module.scss'

export const DEFAULT_BLOCK = { tag: "p", html: "", imageUrl: "" }

export default function Editor({ id, fetchedBlocks, error, isRTL, updatePost, isNew = false }) {
  const [blocks, setBlocks] = useState(fetchedBlocks)
  const [currentBlockId, setCurrentBlockId] = useState(null)
  const prevBlocks = usePrevious(blocks)

  // Update the database whenever blocks change
  useEffect(() => {
    if (prevBlocks && prevBlocks !== blocks) {
      updatePost(blocks);
    }
  }, [blocks, prevBlocks]);

  // Handling the cursor and focus on adding and deleting blocks
  useEffect(() => {
    // If a new block was added, move the caret to it
    if (prevBlocks && prevBlocks.length + 1 === blocks.length) {
      const nextBlockPosition = blocks.map((b) => b._id).indexOf(currentBlockId) + 1 + 1;
      const nextBlock = document.querySelector(
        `[data-position="${nextBlockPosition}"]`
      )
      if (nextBlock) {
        nextBlock.focus()
      }
    }
    // If a block was deleted, move the caret to the end of the last block
    if (prevBlocks && prevBlocks.length - 1 === blocks.length) {
      const lastBlockPosition = prevBlocks
        .map((b) => b._id)
        .indexOf(currentBlockId);
      const lastBlock = document.querySelector(
        `[data-position="${lastBlockPosition}"]`
      );
      if (lastBlock) {
        setCaretToEnd(lastBlock);
      }
    }
  }, [blocks, prevBlocks, currentBlockId]);

  const onDragEndHandler = (result) => {
    const { destination, source } = result;

    // If we don't have a destination (due to dropping outside the droppable)
    // or the destination hasn't changed, we change nothing
    if (!destination || destination.index === source.index) {
      return;
    }

    const updatedBlocks = [...blocks]
    const removedBlocks = updatedBlocks.splice(source.index - 1, 1)
    updatedBlocks.splice(destination.index - 1, 0, removedBlocks[0])
    setBlocks(updatedBlocks);
  }

  const addBlockHandler = (currentBlock) => {
    setCurrentBlockId(currentBlock.id);
    const index = blocks.map((b) => b._id).indexOf(currentBlock.id);
    const updatedBlocks = [...blocks];
    const newBlock = {
      ...DEFAULT_BLOCK,
      _id: objectId()
    }
    updatedBlocks.splice(index + 1, 0, newBlock)
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: currentBlock.tag,
      html: currentBlock.html,
      imageUrl: currentBlock.imageUrl
    }
    setBlocks(updatedBlocks)
  }

  const updateBlockHandler = (currentBlock) => {
    const index = blocks.map((b) => b._id).indexOf(currentBlock.id);
    const oldBlock = blocks[index];
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: currentBlock.tag,
      html: currentBlock.html,
      imageUrl: currentBlock.imageUrl
    };
    setBlocks(updatedBlocks);
    // If the image has been changed, we have to delete the
    // old image file on the server
    if (oldBlock.imageUrl && oldBlock.imageUrl !== currentBlock.imageUrl) {
      deleteImageOnServer(oldBlock.imageUrl);
    }
  }

  const deleteBlockHandler = (currentBlock) => {
    if (blocks.length > 1) {
      setCurrentBlockId(currentBlock.id)
      const index = blocks.map((b) => b._id).indexOf(currentBlock.id)
      const deletedBlock = blocks[index]
      const updatedBlocks = [...blocks]
      updatedBlocks.splice(index, 1)
      setBlocks(updatedBlocks)
      // If the deleted block was an image block, we have to delete
      // the image file on the server
      if (deletedBlock.tag === "img" && deletedBlock.imageUrl) {
        deleteImageOnServer(deletedBlock.imageUrl)
      }
    }
  }

  return (
    <div className={cs(styles.editorContainer, isRTL && styles.editorContainerIsRTL)}>
      <DragDropContext onDragEnd={onDragEndHandler}>
        <Droppable droppableId={id}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {blocks.map((block) => {
                const position = blocks.map((b) => b._id).indexOf(block._id) + 1
                return (
                  <EditableBlock
                    key={block._id}
                    position={position}
                    id={block._id}
                    tag={block.tag}
                    html={block.html}
                    imageUrl={block.imageUrl}
                    pageId={id}
                    addBlock={addBlockHandler}
                    deleteBlock={deleteBlockHandler}
                    updateBlock={updateBlockHandler}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div >
  )
}