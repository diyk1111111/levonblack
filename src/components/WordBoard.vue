<template>
  <div class="wordboard">
    <div class="mistakes">
      <span
        v-for="n in maxWrong"
        :key="n"
        :class="['life', { lost: n <= wrongCount }]"
      >❤️</span>
    </div>

    <div class="letters">
      <div
        v-for="(letter, i) in displayWord"
        :key="i"
        :class="['cell', { open: letter !== '_' }]"
      >
        <span class="letter">{{ letter !== '_' ? letter : '' }}</span>
        <div class="underline" />
      </div>
    </div>

    <div class="wrong-section" v-if="wrongLetters.length > 0">
      <span class="wrong-label">Ошибки:</span>
      <span
        v-for="l in wrongLetters"
        :key="l"
        class="wrong-letter"
      >{{ l }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGame } from '@/composables/useGame'

const { displayWord, wrongLetters, wrongCount, maxWrong } = useGame()
</script>

<style scoped>
.wordboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 24px;
  background: var(--bg2);
  border-radius: var(--radius);
  border: 1px solid rgba(255,255,255,0.06);
}

.mistakes { display: flex; gap: 4px; font-size: 20px; }

.life { filter: grayscale(0); transition: filter 0.3s; }
.life.lost { filter: grayscale(1) brightness(0.4); }

.letters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40px;
}

.letter {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 900;
  color: var(--gold);
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.cell.open .letter { animation: pop 0.3s ease; }

@keyframes pop {
  0% { transform: scale(0.5); opacity: 0; }
  70% { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
}

.underline {
  width: 100%;
  height: 2px;
  background: rgba(255,255,255,0.2);
  border-radius: 1px;
  margin-top: 4px;
}

.cell.open .underline { background: var(--gold); }

.wrong-section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  font-size: 13px;
}

.wrong-label { color: var(--text-muted); }

.wrong-letter {
  font-family: var(--font-display);
  font-size: 14px;
  color: var(--red);
  font-weight: 700;
  padding: 2px 8px;
  background: rgba(232, 48, 74, 0.12);
  border-radius: 4px;
}
</style>
