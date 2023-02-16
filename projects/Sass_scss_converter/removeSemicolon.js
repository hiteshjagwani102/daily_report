export function removeSemicolon(child) {
  if (child.type === "declarationDelimiter") {
    // eslint-disable-next-line no-param-reassign
    child.value = ""
  }
}
