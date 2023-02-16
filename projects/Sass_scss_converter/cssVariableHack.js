export function cssVariableHack(child) {
  if (child.type === "customProperty") {
    // eslint-disable-next-line no-param-reassign
    child.children[0].value = `--${child.children[0].value}`
  }
}
