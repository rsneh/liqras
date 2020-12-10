export function updatePostOnServer(id, blocks, options) {
  return new Promise((resolve, reject) => {
    fetch(`/api/post/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blocks,
        options
      }),
    })
      .then(response => response.json())
      .then(result => resolve(result))
      .catch(error => reject(error))
  })
}

export function uploadFeatureImageToServer(id, imageData) {
  return new Promise((resolve, reject) => {
    fetch(`/api/post/${id}/image`, {
      method: "PUT",
      credentials: "include",
      body: imageData
    })
      .then(response => response.json())
      .then(result => resolve(result))
      .catch(error => reject(error))
  })
}