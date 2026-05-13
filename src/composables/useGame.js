import { computed } from 'vue'
import { useGameStore } from '@/store/gameStore'

/**
 * Компосабл для работы с игрой в компонентах.
 * Используйте его в любом .vue файле вместо прямого импорта стора.
 */
export function useGame() {
  const store = useGameStore()

  const isSpinDisabled = computed(() =>
    store.wheelValue !== 0 || store.gameStatus !== 'playing'
  )

  const isKeyboardDisabled = computed(() =>
    store.wheelValue === 0 || store.gameStatus !== 'playing'
  )

  return {
    // Состояние
    displayWord: computed(() => store.displayWord),
    guessedLetters: computed(() => store.guessedLetters),
    wrongLetters: computed(() => store.wrongLetters),
    wrongCount: computed(() => store.wrongCount),
    maxWrong: computed(() => store.maxWrong),
    players: computed(() => store.players),
    currentPlayer: computed(() => store.currentPlayer),
    wheelValue: computed(() => store.wheelValue),
    gameStatus: computed(() => store.gameStatus),
    hint: computed(() => store.hint),
    category: computed(() => store.category),
    isWon: computed(() => store.isWon),
    isLost: computed(() => store.isLost),

    // Производные флаги
    isSpinDisabled,
    isKeyboardDisabled,

    // Методы
    startGame: store.startGame,
    spinWheel: store.spinWheel,
    checkLetter: store.checkLetter,
    nextPlayer: store.nextPlayer,
    resetGame: store.resetGame
  }
}
