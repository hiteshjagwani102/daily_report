import { SassFormatter, SassTextDocument } from "sass-formatter"

export function formatSass(rawStr, tabSize = 2) {
  return SassFormatter.Format(new SassTextDocument(rawStr), {
    insertSpaces: true,
    tabSize
  })
}
