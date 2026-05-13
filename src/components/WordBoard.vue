<template>
  <div class="wordboard">
    <!-- Hint block - large -->
    <div class="hint-block">
      <div class="hint-category">
        <span class="cat-icon">🏷</span>
        <span>{{ category }}</span>
      </div>
      <p class="hint-text">{{ hint }}</p>
    </div>

    <!-- Letter tiles -->
    <div class="tiles-wrap">
      <transition-group name="tile" tag="div" class="tiles">
        <div
          v-for="(letter, i) in displayWord"
          :key="i"
          :class="['tile', { open: letter !== '_' }]"
        >
          <span class="tile-letter">{{ letter !== '_' ? letter : '' }}</span>
          <div class="tile-shine" v-if="letter !== '_'" />
        </div>
      </transition-group>
    </div>

    <!-- Wrong letters -->
    <div class="wrong-row" v-if="wrongLetters.length">
      <span class="wrong-lbl">Ошибки:</span>
      <transition-group name="wrong" tag="div" class="wrong-letters">
        <span
          v-for="l in wrongLetters"
          :key="l"
          class="wrong-letter"
        >{{ l }}</span>
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import { useGame } from '@/composables/useGame'

const { displayWord, wrongLetters, category, hint } = useGame()
</script>

<style scoped>
.wordboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

/* Hint */
.hint-block {
  width: 100%;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px 24px;
  text-align: center;
  box-shadow: var(--shadow-card);
  position: relative;
  overflow: hidden;
}

.hint-block::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}

.hint-category {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold);
  background: rgba(240,192,64,0.1);
  padding: 4px 14px;
  border-radius: 20px;
  margin-bottom: 12px;
}

.cat-icon { font-size: 14px; }

/* Large hint text */
.hint-text {
  font-family: var(--font-display);
  font-size: clamp(18px, 3vw, 26px);
  font-weight: 700;
  color: var(--text);
  line-height: 1.3;
  text-shadow: 0 1px 8px rgba(0,0,0,0.4);
}

/* Tiles */
.tiles-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
}

.tiles {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.tile {
  width: 52px;
  height: 60px;
  border-radius: 8px;
  background: var(--bg3);
  border: 2px solid rgba(240,192,64,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
  transition: all 0.3s;
}

.tile.open {
  background: linear-gradient(145deg, #2a1a22 0%, #1a0e14 100%);
  border-color: var(--gold);
  box-shadow: 0 0 15px rgba(240,192,64,0.2), 0 4px 12px rgba(0,0,0,0.4);
}

.tile-letter {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 900;
  color: var(--gold);
  position: relative;
  z-index: 1;
}

.tile-shine {
  position: absolute;
  top: 0; left: -50%; width: 30%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
  animation: shine 2s ease infinite;
}

@keyframes shine {
  0%   { left: -50%; }
  100% { left: 130%; }
}

/* Wrong letters */
.wrong-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.wrong-lbl {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.wrong-letters { display: flex; gap: 6px; flex-wrap: wrap; }

.wrong-letter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 900;
  color: var(--crimson);
  background: rgba(192,23,58,0.12);
  border: 1px solid rgba(192,23,58,0.3);
  border-radius: 6px;
}

/* Transitions */
.tile-enter-active { animation: tile-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes tile-pop {
  from { transform: scale(0.5) rotateY(90deg); opacity: 0; }
  to   { transform: scale(1) rotateY(0deg);   opacity: 1; }
}

.wrong-enter-active { animation: wrong-pop 0.3s ease; }
@keyframes wrong-pop {
  from { transform: scale(0); opacity: 0; }
  50%  { transform: scale(1.3); }
  to   { transform: scale(1); opacity: 1; }
}
</style>
