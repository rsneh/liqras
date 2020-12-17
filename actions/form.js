export async function submitSubscribeForm(formData) {
  if (!formData) return {
    error: 'Form is empty.',
    message: 'Email is required.'
  }

  const res = await fetch('/api/subscribe', {
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })

  return await res.json()
}