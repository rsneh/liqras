export function updatePostOnServer(id, blocks, slug, options) {
  const body = JSON.stringify({
    blocks,
    slug,
    options
  })
  return new Promise((resolve, reject) => {
    fetch(`/api/post/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body,
    })
      .then(response => response.json())
      .then(result => resolve(result))
      .catch(error => reject(error))
  })
}

export function publishPostWithId(id) {
  return new Promise((resolve, reject) => {
    fetch(`/api/post/${id}/publish`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(result => resolve(result))
      .catch(error => reject(error))
  })
}

export function deletePostWithId(id) {
  return new Promise((resolve, reject) => {
    fetch(`/api/post/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => {
        if (res.ok) resolve(true);
        else reject(false);
      })
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