export function placeholderHack(child) {
  if (child.type === "placeholder") {
    // eslint-disable-next-line no-param-reassign
    child.children[0].value = `%${child.children[0].value}`
  }
}
