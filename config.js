export default {
  AUTH0: {
    DOMAIN: process.env.AUTH0_DOMAIN,
    CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    COOKIE_SECRET: process.env.AUTH0_COOKIE_SECRET
  },
  CRYPTO: {
    SECRET_KEY: process.env.CRYPTO_SECRET_KEY
  },
  CONTENTFUL: {
    SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN
  }
}