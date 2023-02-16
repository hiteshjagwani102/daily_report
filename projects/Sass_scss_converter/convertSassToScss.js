import { traverseAst } from "./traverseAst.js"
import { addSemicolon } from "./addSemicolon.js"
// import { formatScss } from './formatScss';
import { sassMixinIncludeHack } from "./sassMixinIncludeHack.js"
import { sassMixinDefinitionHack } from "./sassMixinDefinitionHack.js"
import { interpolationHack } from "./interpolationHack.js"
import { removeTrailingSpacesForEachLine } from "./removeTrailingSpacesForEachLine.js"
import { placeholderHack } from "./placeholderHack.js"
import { cssVariableHack } from "./cssVariableHack.js"

let sast;

export async function convertSassToScss(sassStr) {
  const cleanedUpSassStr = removeTrailingSpacesForEachLine(sassStr)
  const ast = sast.parse(`${cleanedUpSassStr}\n\n`, { syntax: "sass" })

  // eslint-disable-next-line no-param-reassign
  traverseAst(ast, node => delete node.position)

  traverseAst(ast, sassMixinIncludeHack)
  traverseAst(ast, sassMixinDefinitionHack)
  traverseAst(ast, addSemicolon)
  traverseAst(ast, interpolationHack)
  traverseAst(ast, placeholderHack)
  traverseAst(ast, cssVariableHack)

  const stringifiedTree = sast.stringify(ast, { syntax: "scss" })

  return stringifiedTree.trim().replace(/\r/g, "")
}
