import { calculateReadingTime } from 'utils/helpers'

export default function PostReadingTime({ blocks }) {
  const words = blocks.reduce((words, block, i) => {
    if(block.tag!=="code") block.html.trim().split(' ').forEach(word => word && words.push(word))
    return words
  }, [])
  const minutes = calculateReadingTime(words)
  if (minutes) {
    return `${minutes} minutes`
  }
  return null
}