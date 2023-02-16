export function removeTrailingSpacesForEachLine(str) {
  str = str
    .split("\n")
    .map(line => line.replace(/\s*$/, ""))
    .join("\n")
    return str;
}
