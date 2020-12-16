import { updatePostById } from 'utils/contentful'
import { parsePost } from 'utils/helpers'

function updatePostBlocks(id, blocks, options) {
  const post = parsePost(blocks, options)
  return new Promise((resolve, reject) => {
    updatePostById(id, post)
      .then(result => resolve(result))
      .catch(reject)
  })
}

export default async function postHandler(req, res) {
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
      const putResult = await updatePostBlocks(id, blocks, options)
      if (putResult) {
        res.status(200).json(putResult)
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}