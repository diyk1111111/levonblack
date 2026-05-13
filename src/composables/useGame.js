import { computed } from 'vue'
import { useGameStore } from '@/store/gameStore'

export function useGame() {
  const store = useGameStore()

  const isSpinDisabled = computed(() =>
    store.gameStatus !== 'spinning'
  )

  const isKeyboardDisabled = computed(() =>
    store.gameStatus !== 'guessing'
  )

  return {
    displayWord:       computed(() => store.displayWord),
    guessedLetters:    computed(() => store.guessedLetters),
    wrongLetters:      computed(() => store.wrongLetters),
    wrongCount:        computed(() => store.wrongCount),
    players:           computed(() => store.players),
    currentPlayer:     computed(() => store.currentPlayer),
    currentPlayerIndex:computed(() => store.currentPlayerIndex),
    wheelValue:        computed(() => store.wheelValue),
    lastSpinResult:    computed(() => store.lastSpinResult),
    gameStatus:        computed(() => store.gameStatus),
    hint:              computed(() => store.hint),
    category:          computed(() => store.category),
    isWon:             computed(() => store.isWon),
    isLost:            computed(() => store.isLost),
    isSpinDisabled,
    isKeyboardDisabled,
    startGame:   store.startGame,
    spinWheel:   store.spinWheel,
    checkLetter: store.checkLetter,
    nextPlayer:  store.nextPlayer,
    resetGame:   store.resetGame,
  }
}
