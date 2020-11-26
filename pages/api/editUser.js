import auth0 from 'utils/auth0';

export default async function editUser(req, res) {
  try {
    const tokenCache = await auth0.tokenCache(req, res);
    const { accessToken } = await tokenCache.getAccessToken({
      scope: ['update:current_user']
    });
    const values = JSON.parse(req.body);
    const url = process.env.AUTH0_AUDIENCE + "users/" + values.id;
    console.log("url", url);
    console.log("accessToken", accessToken);
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(values),
      json: true,
      headers: {
        authorization: "Bearer " + accessToken,
        "content-type": "application/json"
      }
    });
    const data = await response.json();
    console.log("data", data);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .json({ code: error.code, error: error.message });
  }
}