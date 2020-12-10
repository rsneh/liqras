import formidable from 'formidable'
import { updatePostFeatureImageById } from 'utils/contentful'

export default function postImageHandler(req, res) {
  const {
    query: { id },
  } = req

  const promise = new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({ keepExtensions: true })
    form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      resolve({ fields, files });
    })
  })

  return promise.then(({ files }) => {
    return updatePostFeatureImageById(id, files.image)
      .then((result) => {
        if (!result) {
          console.log('updatePostFeatureImageById', 'unable to upload image');
          res.status(400).json({ message: 'Unable to upload image.' })
          return
        }
        console.log(result)
        res.status(200).json({ ok: true })
      }).catch(error => {
        console.error(error);
        res.status(400).json({ message: 'Unable to upload image.' })
      })
  }).catch(err => {
    console.log(err);
    res.status(400).json(err)
  })
}

export const config = {
  api: {
    bodyParser: false
  }
}