export function traverseAst(root, forEveryNode) {
  forEveryNode(root)
  if (root && root.children && root.children.length > 0) {
    root.children.forEach(child => traverseAst(child, forEveryNode))
  }
}
