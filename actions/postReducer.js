import { setLocalStorageValue } from "utils/common"

export const POST_SET_RTL = 'POST_SET_RTL'
export const POST_SET_LOADING = 'POST_SET_LOADING'
export const POST_SET_AUTOSAVE = 'POST_SET_AUTOSAVE'
export const POST_SET_RESULT = 'POST_SET_RESULT'
export const POST_SET_BLOCKS = 'POST_SET_BLOCKS'

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
        ...state,
        loading: false
      }
    case POST_SET_BLOCKS:
      return {
        ...state,
        blocks: payload
      }
    default:
      throw new Error()
  }
}