import { createHash } from 'crypto'
import config from 'config'

const secretKey = config.CRYPTO.SECRET_KEY
const algorithm = 'aes-256-ctr'


function encrypt(text) {
  const hash = createHash('md5').update(text).digest('hex')
  return hash
}

const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'))
  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()])
  return decrpyted.toString()
};

export {
  encrypt,
  decrypt
}