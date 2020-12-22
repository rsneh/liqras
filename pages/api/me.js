import auth0 from 'utils/auth0';

export default async function me(req, res) {
  try {
    const session = await auth0.getSession(req)
    if (!session) res.status(204).end()
    else await auth0.handleProfile(req, res)
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
