import { setLocalStorageValue } from 'utils/common'
import { initializePostState } from 'context/PostContext'

export const POST_SET_RTL = 'POST_SET_RTL'
export const POST_SET_LOADING = 'POST_SET_LOADING'
export const POST_SET_AUTOSAVE = 'POST_SET_AUTOSAVE'
export const POST_SET_RESULT = 'POST_SET_RESULT'
export const POST_SET_BLOCKS = 'POST_SET_BLOCKS'
export const POST_SET_UPDATED = 'POST_SET_UPDATED'

export default function reducer(state, action) {
  const { type, payload } = action
  switch (type) {
    case POST_SET_RTL:
      return {
        ...state,
        isRTL: payload
      }
    case POST_SET_LOADING:
      return {
        ...state,
        loading: payload
      }
    case POST_SET_AUTOSAVE:
      return {
        ...state,
        autoSave: setLocalStorageValue('postAutoSave', payload)
      }
    case POST_SET_RESULT:
      return {
        ...initializePostState(payload),
        updated: true
      }
    case POST_SET_BLOCKS:
      return {
        ...state,
        blocks: payload
      }
    case POST_SET_UPDATED:
      return {
        ...state,
        updated: false
      }
    default:
      throw new Error()
  }
}