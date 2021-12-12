import { useReducer, createContext } from 'react'
import { objectId, getLocalStorageValue } from 'utils/common'
import reducer from 'actions/postReducer'

const initialBlocks = [{
  _id: objectId(),
  html: "Untitled",
  tag: "h1",
  imageUrl: ""
}]

const initialPostState = {
  id: null,
  sys: {},
  isRTL: false,
  autoSave: false,
  loading: false,
  updated: false,
  title: null,
  slug: null,
  featureImage: null,
  blocks: initialBlocks
}

export function initializePostState(post) {
  const { sys, fields } = post || {};
  const id = sys?.id;
  return {
    ...initialPostState,
    id,
    sys,
    isRTL: fields?.options?.isRTL || initialPostState.isRTL,
    title: fields?.title,
    slug: fields?.slug,
    autoSave: getLocalStorageValue('postAutoSave'),
    featureImage: fields?.featureImage || initialPostState.featureImage,
    blocks: fields?.content || initialBlocks,
  }
}

export const PostContext = createContext()

const PostContextProvider = ({ children, fetchedPost }) => {
  const [state, dispatch] = useReducer(reducer, fetchedPost, initializePostState)
  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  )
}

export default PostContextProvider