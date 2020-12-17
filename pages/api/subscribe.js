import config from 'config'

export default async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const LIST_ID = config.MAILCHIMP.LIST_ID
    const API_KEY = config.MAILCHIMP.API_KEY
    const DATACENTER = API_KEY.split('-')[1]

    const data = {
      email_address: email,
      status: 'subscribed',
      tags: ['liqras.com']
    };

    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
      {
        body: JSON.stringify(data),
        headers: {
          Authorization: `apikey ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )

    if (response.status >= 400) {
      return res.status(400).json({
        error: `There was an error submiting the form.`
      })
    }

    return res.status(201).json({ error: '', message: "Thank you for subscribing to our newsletter!" });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};