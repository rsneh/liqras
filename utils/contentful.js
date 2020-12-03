import { createClient } from 'contentful'
import { encrypt } from 'utils/crypto'
import config from 'config'

const configClient = {
  space: config.CONTENTFUL.SPACE_ID,
  accessToken: config.CONTENTFUL.ACCESS_TOKEN,
  host: "preview.contentful.com"
}

const client = createClient(configClient)

export function fetchPosts(nickname) {
  const hashNickname = encrypt(nickname)
  client.getEntries({
    content_type: 'post',
    'author_hash': hashNickname
  }).then((response) => console.log(response.items))
    .catch(({ details }) => console.error(details))
}