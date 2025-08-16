export const normalizeIsbn = isbn => {
  if (!isbn || typeof isbn !== 'string') {
    return []
  }

  return isbn
    .trim()
    .split(/\s+/)
    .filter(part => part.length > 0)
}

export const getPrimaryIsbn = isbn => {
  const normalized = normalizeIsbn(isbn)
  return normalized.length > 0 ? normalized[normalized.length - 1] : null
}

export const isIsbnMatch = (isbn1, isbn2) => {
  if (!isbn1 || !isbn2) {
    return false
  }

  if (isbn1 === isbn2) {
    return true
  }

  const normalized1 = normalizeIsbn(isbn1)
  const normalized2 = normalizeIsbn(isbn2)

  return normalized1.some(isbn => normalized2.includes(isbn))
}
