<template>
  <div class="keyboard">
    <p class="kb-hint" v-if="isKeyboardDisabled && gameStatus === 'playing'">
      Сначала крутите барабан!
    </p>
    <div class="rows">
      <div v-for="(row, ri) in rows" :key="ri" class="row">
        <button
          v-for="letter in row"
          :key="letter"
          :class="['key', getKeyClass(letter)]"
          :disabled="isKeyboardDisabled || isUsed(letter)"
          @click="checkLetter(letter)"
        >{{ letter }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGame } from '@/composables/useGame'

const { guessedLetters, wrongLetters, isKeyboardDisabled, checkLetter, gameStatus } = useGame()

const rows = [
  ['Й','Ц','У','К','Е','Н','Г','Ш','Щ','З','Х','Ъ'],
  ['Ф','Ы','В','А','П','Р','О','Л','Д','Ж','Э'],
  ['Я','Ч','С','М','И','Т','Ь','Б','Ю']
]

function isUsed(letter) {
  return guessedLetters.value.includes(letter) || wrongLetters.value.includes(letter)
}

function getKeyClass(letter) {
  if (guessedLetters.value.includes(letter)) return 'correct'
  if (wrongLetters.value.includes(letter)) return 'wrong'
  return ''
}
</script>

<style scoped>
.keyboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.kb-hint {
  font-size: 12px;
  color: var(--gold);
  background: rgba(245,200,66,0.08);
  padding: 6px 14px;
  border-radius: 20px;
}

.rows { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.row { display: flex; gap: 5px; flex-wrap: wrap; justify-content: center; }

.key {
  width: 38px;
  height: 38px;
  border-radius: 7px;
  background: var(--bg2);
  border: 1px solid rgba(255,255,255,0.1);
  color: var(--text);
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 700;
  transition: all 0.15s;
}

.key:not(:disabled):hover {
  background: rgba(245,200,66,0.15);
  border-color: var(--gold);
  color: var(--gold);
  transform: translateY(-2px);
}

.key:disabled { cursor: not-allowed; opacity: 0.4; }

.key.correct {
  background: rgba(46, 204, 113, 0.2);
  border-color: #2ecc71;
  color: #2ecc71;
}

.key.wrong {
  background: rgba(232, 48, 74, 0.15);
  border-color: var(--red);
  color: var(--red);
}
</style>
