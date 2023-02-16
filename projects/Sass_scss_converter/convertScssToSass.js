import { traverseAst } from "./traverseAst.js"
import { removeSemicolon } from "./removeSemicolon.js"
import { interpolationHack } from "./interpolationHack.js"
// import { formatScss } from './formatScss';
import { removeTrailingSpacesForEachLine } from "./removeTrailingSpacesForEachLine.js"
import { fixIdentation } from "./fixIdentation.js"
import { placeholderHack } from "./placeholderHack.js"
import { cssVariableHack } from "./cssVariableHack.js"

let sast

export async function convertScssToSass(scssStr) {
  const tree = sast.parse(`${scssStr.trim()}\n\n`, { syntax: "scss" })

  // eslint-disable-next-line no-param-reassign
  traverseAst(tree, node => delete node.position)

  traverseAst(tree, removeSemicolon)
  traverseAst(tree, interpolationHack)
  traverseAst(tree, fixIdentation)
  traverseAst(tree, node => {
    // eslint-disable-next-line no-param-reassign
    node.type = node.type === "block" ? "_block" : node.type
  })
  traverseAst(tree, placeholderHack)
  traverseAst(tree, cssVariableHack)

  const stringifiedTree = removeTrailingSpacesForEachLine(
    sast.stringify(tree).trim()
  )
  return stringifiedTree
}
