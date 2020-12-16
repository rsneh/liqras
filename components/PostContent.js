import { createElement } from 'react'

// import { allowedTags } from 'utils/helpers'
// export function convertBlockToHTML(block) {
//   const mapAllowedTags = allowedTags.map(tag => tag.tag)
//   const html = React.createElement(block.tag, null, block.html)
//   console.log(html);
//   const cleanHtml = sanitizeHtml(html, {
//     allowedTags: mapAllowedTags
//     // allowedIframeHostnames: ['www.youtube.com']
//   })
//   return cleanHtml
// }

export default function PostContent({ blocks, showTitle = false, summary = false }) {
  const htmlBlocks = blocks.reduce((prevBlock, currentBlock, index) => {
    if (!showTitle && currentBlock.tag === 'h1') return prevBlock
    if (summary) {
      if (showTitle && index > 1) return prevBlock
      if (!showTitle && index > 4) return prevBlock
    }
    const block = createElement(currentBlock.tag, { key: index }, currentBlock.html)
    prevBlock.push(block)
    return prevBlock
  }, [])
  return htmlBlocks
}