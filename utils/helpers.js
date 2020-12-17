import SiteConfig from 'site.config'

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

export const allowedTags = [
  {
    id: "page-title",
    tag: "h1",
    label: "Page Title",
  },
  {
    id: "heading",
    tag: "h2",
    label: "Heading",
  },
  {
    id: "subheading",
    tag: "h3",
    label: "Subheading",
  },
  {
    id: "paragraph",
    tag: "p",
    label: "Paragraph",
  },
  {
    id: "image",
    tag: "img",
    label: "Image",
  },
  {
    id: "code",
    tag: "code",
    label: "Code",
  }
]

export function getSiteMetaData() {
  return SiteConfig.siteMetadata;
}

export function isDraft(sys) {
  return !sys.publishedVersion
}

export function isChanged(sys) {
  return !!sys.publishedVersion &&
    sys.version >= sys.publishedVersion + 2
}

export function isPublished(sys) {
  return !!sys.publishedVersion &&
    sys.version == sys.publishedVersion + 1
}

export function isArchived(sys) {
  return !!sys.archivedVersion
}

export function dateFormat(d, full = false) {
  const year = d.getFullYear()
  const date = d.getDate()
  const monthName = months[d.getMonth()]
  const hours = d.getHours()
  const minutes = d.getMinutes()
  return full ? `${monthName} ${date}, ${year} ${hours}:${minutes}`
    : `${monthName} ${date}, ${year}`
}

export function parsePost(blocks, slug, options) {
  let title
  Object.values(blocks).map((block) => {
    if (!title && block?.tag === 'h1') title = block?.html.replace(/(<([^>]+)>)/gi, "").trim()
  })

  return {
    title,
    slug,
    blocks,
    options
  }
}

export function parsePostDescription(blocks) {
  const h2Block = blocks.find((currentBlock) => currentBlock.tag === 'h2')
  return h2Block?.html
}

export function convertAuthorId(userId) {
  return Buffer.from(userId).toString('hex')
}

export function slugify(text) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
}

export function calculateReadingTime(words) {
  const averageWordsPerMinute = 200
  if (words.length > 0) {
    const calc = Math.ceil(words.length / averageWordsPerMinute)
    return calc
  }
  return false
}

export function parseFeatureImageSource(featureImage) {
  if (!featureImage) return ''
  const { fields: { file } } = featureImage
  return 'https:' + file?.url
}