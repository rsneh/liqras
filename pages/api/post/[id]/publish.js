import { publishPostWithId } from 'utils/contentful'

export default function postPublishHandler(req, res) {
  const {
    query: { id },
  } = req

  publishPostWithId(id)
    .then(entry => {
      res.status(200).json(entry)
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ message: 'Unable to publish post.' })
    })
}