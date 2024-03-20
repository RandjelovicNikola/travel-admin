export function toCamelCase(str) {
  return str
    .replace(/([A-Z])(?=[a-z])/g, " $1")
    .replace(/^./, char => char.toUpperCase())
}

export function toCapitalized(str) {
  return str[0].toUpperCase() + str.slice(1)
}
