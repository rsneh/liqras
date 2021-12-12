import { updatePostById, deletePostWithId } from 'utils/contentful'
import { parsePost } from 'utils/helpers'

function updatePostBlocks(id, blocks, slug, options) {
  const post = parsePost(blocks, slug, options)
  return new Promise((resolve, reject) => {
    updatePostById(id, post)
      .then(result => resolve(result))
      .catch(reject)
  })
}

export default async function postHandler(req, res) {
  const {
    query: { id },
    body: { blocks, slug, options },
    method,
  } = req

  switch (method) {
    case 'GET':
      // Get data from your database
      res.status(200).json({ id, name: `Post ${id}` })
      break
    case 'PUT':
      const putResult = await updatePostBlocks(id, blocks, slug, options)
      if (putResult) {
        res.status(200).json(putResult)
      }
      break
    case 'DELETE': {
      try {
        const result = await deletePostWithId(id);
        console.log({ result });
        return res.status(200).json({ message: 'Done!' });
      }
      catch (e) {
        console.error(`Unable to delete post id ${id}. Error: ${e}.`);
        return res.status(500).json({ message: 'Unable to delete post.' })
      }
    }
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}