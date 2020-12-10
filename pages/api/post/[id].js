import { updatePostById } from 'utils/contentful'
import { parsePost } from 'utils/helpers'

async function updatePostBlocks(id, blocks, options) {
  const post = parsePost(blocks, options)
  const result = await updatePostById(id, post)
  return result?.sys
}

export default function postHandler(req, res) {
  const {
    query: { id },
    body: { blocks, options },
    method,
  } = req

  switch (method) {
    case 'GET':
      // Get data from your database
      res.status(200).json({ id, name: `User ${id}` })
      break
    case 'PUT':
      const updateResult = updatePostBlocks(id, blocks, options)
      res.status(200).json(updateResult)
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}