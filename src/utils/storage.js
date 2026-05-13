const SCORES_KEY = 'pole_chudes_scores'
const SETTINGS_KEY = 'pole_chudes_settings'

/**
 * Сохраняет результат игры в лидерборд
 * @param {string} playerName
 * @param {number} score
 */
export function saveScore(playerName, score) {
  const scores = getScores()
  scores.push({ name: playerName, score, date: new Date().toLocaleDateString('ru-RU') })
  scores.sort((a, b) => b.score - a.score)
  const top10 = scores.slice(0, 10)
  localStorage.setItem(SCORES_KEY, JSON.stringify(top10))
}

/**
 * Возвращает список рекордов (топ-10)
 */
export function getScores() {
  try {
    return JSON.parse(localStorage.getItem(SCORES_KEY)) || []
  } catch {
    return []
  }
}

/**
 * Очищает все рекорды
 */
export function clearScores() {
  localStorage.removeItem(SCORES_KEY)
}

/**
 * Сохраняет настройки игры
 * @param {object} settings
 */
export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}

/**
 * Загружает настройки, или возвращает дефолтные
 */
export function loadSettings() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || getDefaultSettings()
  } catch {
    return getDefaultSettings()
  }
}

export function getDefaultSettings() {
  return {
    playerCount: 2,
    difficulty: 'normal',  // 'easy' | 'normal' | 'hard'
    category: null          // null = случайная
  }
}
