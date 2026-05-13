<template>
  <div class="game-view">
    <Header />

    <!-- Если игра не начата -->
    <div v-if="gameStatus === 'idle'" class="idle">
      <p>Игра не начата. <RouterLink to="/">На главную</RouterLink></p>
    </div>

    <template v-else>
      <!-- Финальный экран -->
      <div v-if="gameStatus === 'won' || gameStatus === 'lost'" class="result-screen">
        <div class="result-card">
          <div class="result-icon">{{ gameStatus === 'won' ? '🏆' : '💀' }}</div>
          <h2 class="result-title">{{ gameStatus === 'won' ? 'Победа!' : 'Поражение!' }}</h2>
          <p class="result-word">
            Слово было: <strong>{{ store.word }}</strong>
          </p>
          <div class="result-scores">
            <div v-for="p in players" :key="p.name" class="result-player">
              <span>{{ p.name }}</span>
              <span class="score">{{ p.score }} очков</span>
            </div>
          </div>
          <div class="result-btns">
            <button class="btn-gold" @click="playAgain">Ещё раз</button>
            <RouterLink to="/" class="btn-outline">В меню</RouterLink>
          </div>
        </div>
      </div>

      <!-- Основной экран игры -->
      <div v-else class="game-layout">
        <div class="left-col">
          <WordBoard />
          <Keyboard />
        </div>
        <div class="right-col">
          <Wheel />
          <div class="players-list">
            <div
              v-for="(p, i) in players"
              :key="p.name"
              :class="['player-card', { active: i === currentPlayerIndex }]"
            >
              <span class="player-name">{{ p.name }}</span>
              <span class="player-score">{{ p.score }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useGameStore } from '@/store/gameStore'
import Header from '@/components/Header.vue'
import Wheel from '@/components/Wheel.vue'
import WordBoard from '@/components/WordBoard.vue'
import Keyboard from '@/components/Keyboard.vue'

const store = useGameStore()
const router = useRouter()

const gameStatus = computed(() => store.gameStatus)
const players = computed(() => store.players)
const currentPlayerIndex = computed(() => store.currentPlayerIndex)

function playAgain() {
  const names = players.value.map(p => p.name)
  store.startGame(names, store.category || null)
}
</script>

<style scoped>
.game-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
}

.idle {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: var(--text-muted);
}

.idle a { color: var(--gold); }

.game-layout {
  flex: 1;
  display: flex;
  gap: 24px;
  padding: 24px;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
}

.left-col { flex: 1; display: flex; flex-direction: column; gap: 20px; }
.right-col { width: 280px; display: flex; flex-direction: column; gap: 16px; }

.players-list { display: flex; flex-direction: column; gap: 8px; }

.player-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--bg2);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: var(--radius);
  transition: all 0.2s;
}

.player-card.active {
  border-color: var(--gold);
  background: rgba(245, 200, 66, 0.08);
}

.player-name { font-size: 14px; font-weight: 600; }
.player-score { font-family: var(--font-display); font-size: 16px; color: var(--gold); }

/* Результат */
.result-screen {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.result-card {
  background: var(--bg2);
  border: 1px solid rgba(245,200,66,0.2);
  border-radius: 20px;
  padding: 40px;
  max-width: 420px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.result-icon { font-size: 64px; }
.result-title { font-family: var(--font-display); font-size: 32px; font-weight: 900; }
.result-word { color: var(--text-muted); font-size: 15px; }
.result-word strong { color: var(--text); }

.result-scores { display: flex; flex-direction: column; gap: 8px; margin: 8px 0; }

.result-player {
  display: flex;
  justify-content: space-between;
  padding: 10px 14px;
  background: var(--bg);
  border-radius: 8px;
  font-size: 14px;
}

.result-player .score { color: var(--gold); font-weight: 700; }

.result-btns { display: flex; gap: 12px; }

.btn-gold {
  flex: 1;
  padding: 12px;
  background: var(--gold);
  color: #000;
  border-radius: 10px;
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.btn-outline {
  flex: 1;
  padding: 12px;
  background: transparent;
  color: var(--text-muted);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 700px) {
  .game-layout { flex-direction: column; padding: 16px; }
  .right-col { width: 100%; }
}
</style>
