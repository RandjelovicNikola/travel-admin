export function ObjectToQuery(obj) {
  if (obj) {
    return `${Object.entries(obj)
      .map(([name, value], index) =>
        index === 0 ? `?${name}=${value}` : `&${name}=${value}`
      )
      .join("")}`
  }

  return ""
}

export function QueryToObject(query) {
  const params = new URLSearchParams(query)

  const obj = {}

  if (params) {
    params.forEach((value, key) => {
      if (obj.hasOwnProperty(key)) {
        obj[key] = [].concat(obj[key], value)
      } else {
        obj[key] = value
      }
    })
  }

  return obj
}
