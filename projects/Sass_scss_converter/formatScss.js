// eslint-disable-next-line @typescript-eslint/no-var-requires
const scssfmt = require("scssfmt")

export function formatScss(rawStr) {
  return scssfmt(rawStr)
}
