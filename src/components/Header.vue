<template>
  <header class="header">
    <RouterLink to="/" class="logo">ПОЛЕ <span>ЧУДЕС</span></RouterLink>

    <div class="center" v-if="gameStatus === 'playing'">
      <span class="category-badge">{{ category }}</span>
      <span class="hint">💡 {{ hint }}</span>
    </div>

    <div class="right">
      <span v-if="currentPlayer" class="turn-label">
        Ход: <strong>{{ currentPlayer.name }}</strong>
      </span>
      <span v-if="wheelValue > 0" class="wheel-value">
        🎯 {{ wheelValue }}
      </span>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useGameStore } from '@/store/gameStore'

const store = useGameStore()
const gameStatus = computed(() => store.gameStatus)
const category = computed(() => store.category)
const hint = computed(() => store.hint)
const currentPlayer = computed(() => store.currentPlayer)
const wheelValue = computed(() => store.wheelValue)
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  background: var(--bg2);
  border-bottom: 1px solid rgba(255,255,255,0.07);
  flex-wrap: wrap;
  gap: 10px;
}

.logo {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 900;
  color: var(--text);
  letter-spacing: 0.05em;
}

.logo span { color: var(--gold); }

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.category-badge {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--gold);
  background: rgba(245,200,66,0.1);
  padding: 2px 10px;
  border-radius: 20px;
}

.hint { font-size: 13px; color: var(--text-muted); }

.right {
  display: flex;
  align-items: center;
  gap: 14px;
}

.turn-label { font-size: 13px; color: var(--text-muted); }
.turn-label strong { color: var(--text); }

.wheel-value {
  font-family: var(--font-display);
  font-size: 16px;
  color: var(--gold);
  font-weight: 700;
}
</style>
