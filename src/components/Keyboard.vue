<template>
  <div class="keyboard-wrap">
    <p class="kb-hint" v-if="isKeyboardDisabled && gameStatus === 'spinning'">
      🎡 Сначала крутите барабан!
    </p>
    <p class="kb-hint guessing" v-else-if="!isKeyboardDisabled">
      ⌨ Называйте букву!
    </p>
    <div class="rows">
      <div v-for="(row, ri) in rows" :key="ri" class="row">
        <button
          v-for="letter in row"
          :key="letter"
          :class="['key', getKeyClass(letter), isVowel(letter) ? 'vowel' : 'consonant']"
          :disabled="isKeyboardDisabled || isUsed(letter)"
          @click="checkLetter(letter)"
        >{{ letter }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGame } from '@/composables/useGame'

const { guessedLetters, wrongLetters, isKeyboardDisabled, checkLetter, gameStatus } = useGame()

const rows = [
  ['Й','Ц','У','К','Е','Н','Г','Ш','Щ','З','Х','Ъ'],
  ['Ф','Ы','В','А','П','Р','О','Л','Д','Ж','Э'],
  ['Я','Ч','С','М','И','Т','Ь','Б','Ю'],
]

const VOWELS = new Set(['А','Е','Ё','И','О','У','Ы','Э','Ю','Я'])

function isVowel(l) { return VOWELS.has(l) }

function isUsed(l) {
  return guessedLetters.value.includes(l) || wrongLetters.value.includes(l)
}

function getKeyClass(l) {
  if (guessedLetters.value.includes(l)) return 'correct'
  if (wrongLetters.value.includes(l))  return 'wrong'
  return ''
}
</script>

<style scoped>
.keyboard-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.kb-hint {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 7px 18px;
  border-radius: 20px;
  color: var(--text-muted);
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
}

.kb-hint.guessing {
  color: var(--gold);
  background: rgba(240,192,64,0.07);
  border-color: rgba(240,192,64,0.2);
}

.rows {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 100%;
}

.row {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  justify-content: center;
}

.key {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--card);
  border: 1px solid rgba(255,255,255,0.08);
  color: var(--text-dim);
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 700;
  transition: all 0.15s;
  position: relative;
  overflow: hidden;
}

/* Vowel - soft blue glow */
.key.vowel:not(:disabled):not(.correct):not(.wrong) {
  border-color: rgba(0,212,255,0.2);
  color: #80e8ff;
}

.key.vowel:not(:disabled):not(.correct):not(.wrong):hover {
  background: rgba(0,212,255,0.12);
  border-color: var(--neon-blue);
  color: var(--neon-blue);
  box-shadow: 0 0 12px rgba(0,212,255,0.3);
  transform: translateY(-2px);
}

/* Consonant - soft gold glow */
.key.consonant:not(:disabled):not(.correct):not(.wrong) {
  border-color: rgba(240,192,64,0.15);
}

.key.consonant:not(:disabled):not(.correct):not(.wrong):hover {
  background: rgba(240,192,64,0.1);
  border-color: var(--gold);
  color: var(--gold);
  box-shadow: 0 0 12px rgba(240,192,64,0.25);
  transform: translateY(-2px);
}

.key:disabled { cursor: not-allowed; opacity: 0.3; }

.key.correct {
  background: rgba(0,230,118,0.12);
  border-color: var(--green);
  color: var(--green);
  box-shadow: 0 0 8px rgba(0,230,118,0.2);
}

.key.wrong {
  background: rgba(192,23,58,0.15);
  border-color: rgba(192,23,58,0.5);
  color: rgba(192,23,58,0.7);
  text-decoration: line-through;
}
</style>
