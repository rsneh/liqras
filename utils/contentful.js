import config from 'config'
import { createClient } from 'contentful'
import { createClient as createManagementClient } from 'contentful-management'
import { createReadStream } from 'fs'
import { convertAuthorId, slugify } from 'utils/helpers'

const configManagementClient = {
  space: config.CONTENTFUL.SPACE_ID,
  accessToken: config.CONTENTFUL.MANAGEMENT_ACCESS_TOKEN
}

const configPreviewClient = {
  space: config.CONTENTFUL.SPACE_ID,
  accessToken: config.CONTENTFUL.PREVIEW_ACCESS_TOKEN,
  host: "preview.contentful.com"
}

const configDeliveryClient = {
  space: config.CONTENTFUL.SPACE_ID,
  accessToken: config.CONTENTFUL.DELIVERY_ACCESS_TOKEN
}

const deliveryClient = createClient(configDeliveryClient)
const previewClient = createClient(configPreviewClient)
const managementClient = createManagementClient(configManagementClient)

export function fetchBlogPosts(blogId) {
  return new Promise((resolve, reject) => {
    deliveryClient.getEntry(blogId)
      .then((entry) => {
        const posts = entry.fields?.posts || []
        resolve(posts)
      })
      .catch(reject)
  })
}

export function fetchBlogBySlug(slug) {
  return new Promise((resolve, reject) => {
    deliveryClient.getEntries({
      content_type: 'blog',
      include: 2,
      'fields.slug': slug
    })
      .then((entries) => {
        const { items } = entries
        const blog = items?.find(item => item?.fields?.slug === slug) || null
        resolve({
          blog
        })
      })
      .catch(reject)
  })
}

export function fetchBlogForIndex() {
  return new Promise((resolve, reject) => {
    deliveryClient.getEntries({
      content_type: 'blog',
      include: 2
    })
      .then((entries) => {
        const blogs = entries?.items?.map(blog => blog.fields)
        resolve({ blogs })
      })
      .catch(reject)
  })
}

export function fetchBlogbyId(blogId, preview = false) {
  return new Promise((resolve, reject) => {
    if (preview) {
      previewClient.getEntry(blogId)
        .then((entry) => resolve(entry))
        .catch(reject)
    }
    else {
      deliveryClient.getEntry(blogId)
        .then((entry) => resolve(entry))
        .catch(reject)
    }
  })
}

export function updatePostById(id, post) {
  return new Promise((resolve, reject) => {
    managementClient.getSpace(config.CONTENTFUL.SPACE_ID)
      .then((space) => space.getEnvironment('master'))
      .then((environment) => environment.getEntry(id))
      .then((entry) => {
        const { title, blocks, options } = post
        const slug = post?.slug || slugify(title)
        if ('title' in entry.fields) {
          entry.fields.title['en-US'] = title
        } else {
          entry.fields['title'] = {
            'en-US': title
          }
        }

        if ('slug' in entry.fields) {
          entry.fields.slug['en-US'] = slug
        } else {
          entry.fields['slug'] = {
            'en-US': slug
          }
        }

        if ('options' in entry.fields) {
          entry.fields.options['en-US'] = options
        } else {
          entry.fields['options'] = {
            'en-US': options
          }
        }

        if ('content' in entry.fields) {
          entry.fields.content['en-US'] = blocks
        } else {
          entry.fields['content'] = {
            'en-US': blocks
          }
        }
        return entry.update()
      })
      .then((mangedEntry) => {
        const { sys } = mangedEntry
        previewClient.getEntry(id)
          .then((entry) => resolve({ ...entry, sys }))
          .catch(reject)
      })
      .catch(reject)
  })
}

export function updatePostFieldById(id, field) {
  const { name, value } = field
  return new Promise((resolve, reject) => {
    managementClient.getSpace(config.CONTENTFUL.SPACE_ID)
      .then((space) => space.getEnvironment('master'))
      .then((environment) => environment.getEntry(id))
      .then((entry) => {
        if (name in entry.fields) {
          entry.fields[name]['en-US'] = value
        }
        else {
          entry.fields[name] = {
            'en-US': value
          }
        }
        return entry.update()
      })
      .then((entry) => resolve(entry))
      .catch(reject)
  })
}

export function publishPostWithId(id) {
  return new Promise((resolve, reject) => {
    managementClient.getSpace(config.CONTENTFUL.SPACE_ID)
      .then((space) => space.getEnvironment('master'))
      .then((environment) => environment.getEntry(id))
      .then((entry) => entry.publish())
      .then((mangedEntry) => {
        const { sys } = mangedEntry
        previewClient.getEntry(id)
          .then((entry) => resolve({ ...entry, sys }))
          .catch(reject)
      })
      .catch(reject)
  })
}

export function deletePostWithId(id) {
  return new Promise((resolve, reject) => {
    managementClient.getSpace(config.CONTENTFUL.SPACE_ID)
      .then((space) => space.getEnvironment('master'))
      .then((environment) => environment.getEntry(id))
      .then((entry) => entry.delete())
      .then(() => resolve('Entry deleted.'))
      .catch(reject)
  });
}

export function attachPostToBlog(blogId, post) {
  const { id: postId, type } = post
  return new Promise((resolve, reject) => {
    managementClient.getSpace(config.CONTENTFUL.SPACE_ID)
      .then((space) => space.getEnvironment('master'))
      .then((environment) => environment.getEntry(blogId))
      .then((entry) => {
        const value = {
          sys: {
            id: postId,
            linkType: "Entry",
            type: "Link"
          }
        }
        if ('posts' in entry.fields) {
          const posts = entry.fields['posts']['en-US']
          entry.fields['posts']['en-US'] = [...posts, value]
        }
        else {
          entry.fields['posts'] = {
            'en-US': [value]
          }
        }
        entry.update()
        resolve(post)
      })
      .catch(reject)
  })
}

export function fetchPostPreviewById(postId) {
  return new Promise((resolve, reject) => {
    managementClient.getSpace(config.CONTENTFUL.SPACE_ID)
      .then((space) => space.getEnvironment('master'))
      .then((environment) => environment.getEntry(postId))
      .then((mangedEntry) => {
        const { sys } = mangedEntry
        previewClient.getEntry(postId)
          .then((entry) => resolve({ ...entry, sys }))
          .catch(reject)
      })
      .catch(reject)
  })
}

export function fetchPostById(postId) {
  return new Promise((resolve, reject) => {
    deliveryClient.getEntry(postId)
      .then((entry) => resolve(entry))
      .catch(reject)
  })
}

export function initialPost(user) {
  return new Promise((resolve, reject) => {
    managementClient.getSpace(config.CONTENTFUL.SPACE_ID)
      .then((space) => space.getEnvironment('master'))
      .then((environment) => environment.createEntry('post', {
        fields: {
          title: {
            'en-US': 'Untitled'
          }
        }
      }))
      .then((entry) => {
        const { sys } = entry
        const blogId = convertAuthorId(user.sub)
        attachPostToBlog(blogId, sys)
          .then(post => resolve(post))
          .catch(reject)
      })
      .catch(reject)
  })
}

export function updatePostFeatureImageById(id, image) {
  const uploadStream = image?.path ? createReadStream(image.path) : null
  return new Promise((resolve, reject) => {
    if (!uploadStream) {
      reject({ message: 'Unable to open file.' })
      return
    }
    managementClient.getSpace(config.CONTENTFUL.SPACE_ID)
      .then((space) => space.getEnvironment('master'))
      .then((environment) => environment.createAssetFromFiles({
        fields: {
          title: {
            "en-US": `Feature image for post ${id}`
          },
          file: {
            'en-US': {
              contentType: image.type,
              fileName: image.name,
              file: uploadStream
            }
          }
        }
      }))
      .then((asset) => asset.processForAllLocales())
      .then((asset) => asset.publish())
      .then((result) => {
        // attach asset to post feature image
        const field = {
          name: 'featureImage',
          value: {
            sys: {
              id: result.sys.id,
              linkType: result.sys.type,
              type: "Link"
            }
          }
        }
        return updatePostFieldById(id, field)
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
      .catch(reject)
  })
}

export function updateBlogAuthorById(blogId, author) {
  return new Promise((resolve, reject) => {
    managementClient.getSpace(config.CONTENTFUL.SPACE_ID)
      .then((space) => space.getEnvironment('master'))
      .then((environment) => environment.getEntry(blogId))
      .then((entry) => {
        if ('author' in entry.fields) {
          const entryAuthorPost = entry?.fields?.author['en-US']
          if (!entryAuthorPost) reject({ error: 'Can not find Author field.' })
          entry.fields.author['en-US'] = {
            ...entryAuthorPost,
            ...author
          }
          entry.update()
          entry.publish()
        } else {
          reject({ error: 'Author is not set.' })
        }
        resolve(entry)
      })
      .catch(reject)
  })
}