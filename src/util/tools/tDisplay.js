export function displayCamelCaseString(str) {
  return str
    .replace(/([A-Z])(?=[a-z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
}
