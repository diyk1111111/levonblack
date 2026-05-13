import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getRandomWord } from '@/services/wordsService'
import { saveScore } from '@/utils/storage'

export const MAX_LIVES = 6

export const useGameStore = defineStore('game', () => {
  const word = ref('')
  const hint = ref('')
  const category = ref('')
  const guessedLetters = ref([])
  const wrongLetters = ref([])
  const players = ref([])  // [{ name, score, lives }]
  const currentPlayerIndex = ref(0)
  const wheelValue = ref(0)
  const lastSpinResult = ref(null) // { value, type: 'points'|'bankrupt'|'prize' }
  const gameStatus = ref('idle') // 'idle'|'spinning'|'guessing'|'won'|'lost'

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

  const isLost = computed(() =>
    players.value.length > 0 &&
    players.value.every(p => p.lives <= 0)
  )

  const wrongCount = computed(() => wrongLetters.value.length)

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
    lastSpinResult.value = null
    gameStatus.value = 'spinning'

    players.value = playerNames.map(name => ({
      name,
      score: 0,
      lives: MAX_LIVES
    }))
  }

  function spinWheel() {
    const segments = [
      { value: 100, type: 'points' },
      { value: 200, type: 'points' },
      { value: 300, type: 'points' },
      { value: 400, type: 'points' },
      { value: 500, type: 'points' },
      { value: 700, type: 'points' },
      { value: 0,   type: 'bankrupt' },
      { value: 150, type: 'points' },
      { value: 250, type: 'points' },
      { value: 350, type: 'points' },
      { value: 600, type: 'points' },
      { value: 0,   type: 'bankrupt' },
    ]
    const seg = segments[Math.floor(Math.random() * segments.length)]
    lastSpinResult.value = seg

    if (seg.type === 'bankrupt') {
      if (currentPlayer.value) currentPlayer.value.score = 0
      wheelValue.value = 0
      // Bankrupt = lose a life too
      if (currentPlayer.value && currentPlayer.value.lives > 0) {
        currentPlayer.value.lives--
      }
      if (!isLost.value) {
        _advanceToNextAlivePlayer()
        gameStatus.value = 'spinning'
      } else {
        gameStatus.value = 'lost'
      }
      return seg
    }

    wheelValue.value = seg.value
    gameStatus.value = 'guessing'
    return seg
  }

  function checkLetter(letter) {
    const L = letter.toUpperCase()
    if (guessedLetters.value.includes(L) || wrongLetters.value.includes(L)) return

    if (word.value.includes(L)) {
      guessedLetters.value = [...guessedLetters.value, L]
      const count = word.value.split('').filter(c => c === L).length
      if (currentPlayer.value && wheelValue.value > 0) {
        currentPlayer.value.score += wheelValue.value * count
      }
      wheelValue.value = 0

      if (isWon.value) {
        gameStatus.value = 'won'
        players.value.forEach(p => {
          if (p.score > 0) saveScore(p.name, p.score)
        })
        return
      }
      // Correct guess → spin again (keep turn)
      gameStatus.value = 'spinning'
    } else {
      wrongLetters.value = [...wrongLetters.value, L]
      wheelValue.value = 0

      // Lose a life
      if (currentPlayer.value && currentPlayer.value.lives > 0) {
        currentPlayer.value.lives--
      }

      if (isLost.value) {
        gameStatus.value = 'lost'
      } else {
        _advanceToNextAlivePlayer()
        gameStatus.value = 'spinning'
      }
    }
  }

  function _advanceToNextAlivePlayer() {
    const total = players.value.length
    let next = (currentPlayerIndex.value + 1) % total
    let attempts = 0
    while (players.value[next].lives <= 0 && attempts < total) {
      next = (next + 1) % total
      attempts++
    }
    currentPlayerIndex.value = next
  }

  function nextPlayer() {
    wheelValue.value = 0
    if (!isLost.value) {
      _advanceToNextAlivePlayer()
      gameStatus.value = 'spinning'
    } else {
      gameStatus.value = 'lost'
    }
  }

  function resetGame() {
    word.value = ''
    hint.value = ''
    category.value = ''
    guessedLetters.value = []
    wrongLetters.value = []
    players.value = []
    currentPlayerIndex.value = 0
    wheelValue.value = 0
    lastSpinResult.value = null
    gameStatus.value = 'idle'
  }

  return {
    word, hint, category,
    guessedLetters, wrongLetters,
    players, currentPlayerIndex, currentPlayer,
    wheelValue, lastSpinResult, gameStatus,
    displayWord, isWon, isLost, wrongCount,
    startGame, spinWheel, checkLetter, nextPlayer, resetGame
  }
})
