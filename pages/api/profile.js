import auth0 from 'utils/auth0'
import { updateBlogAuthorById } from 'utils/contentful'
import { convertAuthorId, parseProfile } from 'utils/helpers'

function updateProfile(userId, body) {
  const authorProfile = parseProfile(body)
  return new Promise((resolve, reject) => {
    updateBlogAuthorById(userId, authorProfile)
      .then(result => resolve(result))
      .catch(reject)
  })
}

export default async function profileHandler(req, res) {
  const {
    body,
    method,
  } = req

  const session = await auth0.getSession(req)
  const user = session?.user || null
  if (!user) {
    res.status(403).json({ message: 'Forbidden' })
    return
  }

  const blogId = convertAuthorId(user.sub)
  switch (method) {
    case 'PUT':
      const putResult = updateProfile(blogId, body)
      if (putResult) {
        res.status(200).json(putResult)
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}