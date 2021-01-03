import { createElement } from 'react'
import decodeHtml from 'decode-html'

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

function decodeAndParseHtml(html) {
  return decodeHtml(html)
}

export default function PostContent({ blocks, showTitle = false, summary = false }) {
  const htmlBlocks = blocks.reduce((prevBlock, currentBlock, index) => {
    if (!showTitle && currentBlock.tag === 'h1') return prevBlock
    if (summary) {
      if (showTitle && index > 1) return prevBlock
      if (!showTitle && index > 4) return prevBlock
    }
    let block;
    if (currentBlock.tag === "code") {
      block = createElement("pre", { key: index }, (
        <code>{decodeHtml(currentBlock.html)}</code>
      ))
    }
    else {
      block = createElement(currentBlock.tag, {
        key: index,
        dangerouslySetInnerHTML: {
          __html: decodeAndParseHtml(currentBlock.html)
        }
      })
    }
    prevBlock.push(block)
    return prevBlock
  }, [])
  return htmlBlocks
}