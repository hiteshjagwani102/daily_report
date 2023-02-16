export function interpolationHack(child) {
  if (child.type === "interpolation") {
    child.children.unshift({
      type: "space",
      value: "#{"
    })

    child.children.push({
      type: "space",
      value: "}"
    })
  }
}
