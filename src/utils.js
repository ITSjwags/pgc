export function toTitleCase(string) {
  return string.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()
  )
}
