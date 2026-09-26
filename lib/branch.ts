export function branchFromQuery(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value
  const name = raw?.trim().replace(/\s+/g, " ")

  if (!name || name.length > 80) {
    return null
  }

  return name
}
