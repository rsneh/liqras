import { publishPostWithId } from 'utils/contentful'

export default async function postPublishHandler(req, res) {
  const {
    query: { id },
  } = req

  const entry = await publishPostWithId(id)
  if (!entry) {
    console.log(err)
    res.status(400).json({ message: 'Unable to publish post.' })
  }
  else {
    res.status(200).json(entry)
  }
}