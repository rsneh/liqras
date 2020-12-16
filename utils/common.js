export function makeString(length) {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export function objectId() {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16)
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  )
}

export function getLocalStorageValue(key) {
  const item = typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem(key) : undefined
  return item ? JSON.parse(item) : undefined
}

export function setLocalStorageValue(key, value) {
  const valueToStore = value instanceof Function ? value(storedValue) : value
  window.localStorage.setItem(key, JSON.stringify(valueToStore))
  return valueToStore
}