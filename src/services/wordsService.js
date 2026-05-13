import words from '@/data/words.json'

/**
 * Возвращает все доступные категории
 */
export function getCategories() {
  const cats = words.map(w => w.category)
  return [...new Set(cats)]
}

/**
 * Возвращает случайное слово из заданной категории
 * Если категория не указана — из любой
 */
export function getRandomWord(category = null) {
  const pool = category
    ? words.filter(w => w.category === category)
    : words

  if (pool.length === 0) return null
  const idx = Math.floor(Math.random() * pool.length)
  return { ...pool[idx] }
}

/**
 * Возвращает все слова конкретной категории
 */
export function getWordsByCategory(category) {
  return words.filter(w => w.category === category)
}
