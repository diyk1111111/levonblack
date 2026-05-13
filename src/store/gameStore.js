import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getRandomWord } from '@/services/wordsService'
import { saveScore } from '@/utils/storage'

export const useGameStore = defineStore('game', () => {
  // --- Состояние ---
  const word = ref('')           // загаданное слово (ЖИРАФ)
  const hint = ref('')           // подсказка
  const category = ref('')       // категория
  const guessedLetters = ref([]) // угаданные буквы
  const wrongLetters = ref([])   // ошибочные буквы
  const players = ref([])        // [{ name, score }]
  const currentPlayerIndex = ref(0)
  const wheelValue = ref(0)      // очки за тур с барабана
  const gameStatus = ref('idle') // 'idle' | 'playing' | 'won' | 'lost'
  const maxWrong = ref(6)

  // --- Вычисляемые ---
  const currentPlayer = computed(() => players.value[currentPlayerIndex.value] || null)

  const displayWord = computed(() =>
    word.value.split('').map(letter =>
      guessedLetters.value.includes(letter) ? letter : '_'
    )
  )

  const isWon = computed(() =>
    word.value.length > 0 &&
    word.value.split('').every(l => guessedLetters.value.includes(l))
  )

  const isLost = computed(() => wrongLetters.value.length >= maxWrong.value)

  const wrongCount = computed(() => wrongLetters.value.length)

  // --- Действия ---

  /**
   * Начать новую игру
   * @param {string[]} playerNames
   * @param {string|null} selectedCategory
   */
  function startGame(playerNames, selectedCategory = null) {
    const wordData = getRandomWord(selectedCategory)
    if (!wordData) return

    word.value = wordData.word.toUpperCase()
    hint.value = wordData.hint
    category.value = wordData.category
    guessedLetters.value = []
    wrongLetters.value = []
    currentPlayerIndex.value = 0
    wheelValue.value = 0
    gameStatus.value = 'playing'

    players.value = playerNames.map(name => ({ name, score: 0 }))
  }

  /**
   * Крутим барабан — возвращает случайное значение
   */
  function spinWheel() {
    const values = [100, 150, 200, 250, 300, 400, 500, 0] // 0 = банкрот
    const result = values[Math.floor(Math.random() * values.length)]
    wheelValue.value = result
    return result
  }

  /**
   * Проверяем букву
   * @param {string} letter
   */
  function checkLetter(letter) {
    const L = letter.toUpperCase()
    if (guessedLetters.value.includes(L) || wrongLetters.value.includes(L)) return

    if (word.value.includes(L)) {
      guessedLetters.value = [...guessedLetters.value, L]
      const count = word.value.split('').filter(c => c === L).length
      if (currentPlayer.value && wheelValue.value > 0) {
        currentPlayer.value.score += wheelValue.value * count
      }
      if (isWon.value) {
        gameStatus.value = 'won'
        if (currentPlayer.value) {
          saveScore(currentPlayer.value.name, currentPlayer.value.score)
        }
      }
    } else {
      wrongLetters.value = [...wrongLetters.value, L]
      if (isLost.value) {
        gameStatus.value = 'lost'
      } else {
        nextPlayer()
      }
    }
  }

  /**
   * Переходим к следующему игроку
   */
  function nextPlayer() {
    wheelValue.value = 0
    currentPlayerIndex.value = (currentPlayerIndex.value + 1) % players.value.length
  }

  /**
   * Сброс игры
   */
  function resetGame() {
    word.value = ''
    hint.value = ''
    category.value = ''
    guessedLetters.value = []
    wrongLetters.value = []
    players.value = []
    currentPlayerIndex.value = 0
    wheelValue.value = 0
    gameStatus.value = 'idle'
  }

  return {
    word, hint, category,
    guessedLetters, wrongLetters,
    players, currentPlayerIndex, currentPlayer,
    wheelValue, gameStatus, maxWrong,
    displayWord, isWon, isLost, wrongCount,
    startGame, spinWheel, checkLetter, nextPlayer, resetGame
  }
})
