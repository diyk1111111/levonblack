<template>
  <div class="game-view">
    <!-- Top bar -->
    <header class="topbar">
      <RouterLink to="/" class="logo">
        <span class="logo-text">ПОЛЕ</span>
        <span class="logo-gold">ЧУДЕС</span>
      </RouterLink>
      <div class="topbar-center" v-if="gameStatus === 'spinning' || gameStatus === 'guessing'">
        <span class="turn-label">
          Ход игрока:
          <strong class="turn-name">{{ currentPlayer?.name }}</strong>
        </span>
        <span class="status-badge" :class="gameStatus">
          {{ gameStatus === 'spinning' ? '🎡 Крутите!' : '⌨ Угадывайте!' }}
        </span>
      </div>
      <div class="topbar-right">
        <RouterLink to="/rules" class="rules-link">📖 Правила</RouterLink>
      </div>
    </header>

    <!-- Idle -->
    <div v-if="gameStatus === 'idle'" class="idle-screen">
      <p>Игра не начата.</p>
      <RouterLink to="/" class="go-home-btn">На главную →</RouterLink>
    </div>

    <!-- Win / Lose -->
    <div v-else-if="gameStatus === 'won' || gameStatus === 'lost'" class="result-overlay">
      <div class="result-card" :class="gameStatus">
        <div class="result-big-icon">{{ gameStatus === 'won' ? '🏆' : '💀' }}</div>
        <h2 class="result-title">{{ gameStatus === 'won' ? 'Победа!' : 'Никто не угадал!' }}</h2>
        <p class="result-word-reveal">
          Загаданное слово: <strong>{{ store.word }}</strong>
        </p>

        <div class="result-players">
          <div v-for="p in players" :key="p.name" class="rp-row">
            <span class="rp-name">{{ p.name }}</span>
            <span class="rp-lives">
              <span v-for="n in store.maxLives ?? 6" :key="n"
                :style="{ color: n <= p.lives ? '#ff2d6e' : 'rgba(255,255,255,0.1)' }">♥</span>
            </span>
            <span class="rp-score">{{ p.score.toLocaleString() }} очков</span>
          </div>
        </div>

        <div class="result-actions">
          <button class="btn-gold" @click="playAgain">▶ Ещё раз</button>
          <RouterLink to="/" class="btn-outline">← В меню</RouterLink>
        </div>
      </div>
    </div>

    <!-- Active game -->
    <div v-else class="game-area">
      <!-- Left: Players 0 & 2 -->
      <aside class="side-panel left">
        <template v-for="(p, i) in players" :key="p.name">
          <div v-if="i % 2 === 0"
            :class="['player-card', { active: i === currentPlayerIndex, dead: p.lives <= 0 }]"
          >
            <div class="active-bar" v-if="i === currentPlayerIndex" />
            <div class="pc-top">
              <div class="pc-avatar" :class="`av-${i}`">{{ p.name[0] }}</div>
              <div class="pc-meta">
                <div class="pc-name">{{ p.name }}</div>
                <div class="pc-score">
                  <span class="sc-n">{{ p.score.toLocaleString() }}</span>
                  <span class="sc-u">очков</span>
                </div>
              </div>
              <span class="crown" v-if="i === currentPlayerIndex">👑</span>
            </div>
            <div class="pc-lives">
              <span v-for="n in MAX_LIVES" :key="n"
                :class="['lh', { alive: n <= p.lives }]">♥</span>
            </div>
            <div class="eliminated-badge" v-if="p.lives <= 0">💀 Выбыл</div>
          </div>
        </template>
      </aside>

      <!-- Center -->
      <main class="center-col">
        <WordBoard />
        <div class="wheel-center">
          <Wheel />
        </div>
        <Keyboard />
      </main>

      <!-- Right: Players 1 & 3 -->
      <aside class="side-panel right">
        <template v-for="(p, i) in players" :key="p.name">
          <div v-if="i % 2 === 1"
            :class="['player-card', { active: i === currentPlayerIndex, dead: p.lives <= 0 }]"
          >
            <div class="active-bar" v-if="i === currentPlayerIndex" />
            <div class="pc-top">
              <div class="pc-avatar" :class="`av-${i}`">{{ p.name[0] }}</div>
              <div class="pc-meta">
                <div class="pc-name">{{ p.name }}</div>
                <div class="pc-score">
                  <span class="sc-n">{{ p.score.toLocaleString() }}</span>
                  <span class="sc-u">очков</span>
                </div>
              </div>
              <span class="crown" v-if="i === currentPlayerIndex">👑</span>
            </div>
            <div class="pc-lives">
              <span v-for="n in MAX_LIVES" :key="n"
                :class="['lh', { alive: n <= p.lives }]">♥</span>
            </div>
            <div class="eliminated-badge" v-if="p.lives <= 0">💀 Выбыл</div>
          </div>
        </template>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useGameStore, MAX_LIVES } from '@/store/gameStore'
import { useGame } from '@/composables/useGame'
import Wheel from '@/components/Wheel.vue'
import WordBoard from '@/components/WordBoard.vue'
import Keyboard from '@/components/Keyboard.vue'

const store = useGameStore()
const { gameStatus, players, currentPlayer, currentPlayerIndex } = useGame()

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
  position: relative;
}

/* Topbar */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: var(--card);
  border-bottom: 1px solid var(--border);
  gap: 12px;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.logo {
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 900;
}

.logo-text { color: var(--text); }
.logo-gold { color: var(--gold); }

.topbar-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  flex: 1;
}

.turn-label {
  font-size: 13px;
  color: var(--text-muted);
}

.turn-name {
  color: var(--text);
  font-size: 15px;
}

.status-badge {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 3px 12px;
  border-radius: 20px;
  text-transform: uppercase;
}

.status-badge.spinning {
  background: rgba(240,192,64,0.1);
  color: var(--gold);
  border: 1px solid rgba(240,192,64,0.2);
}

.status-badge.guessing {
  background: rgba(0,212,255,0.1);
  color: var(--neon-blue);
  border: 1px solid rgba(0,212,255,0.2);
}

.topbar-right { display: flex; align-items: center; gap: 12px; }

.rules-link {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 600;
  padding: 6px 14px;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px;
  transition: all 0.2s;
}

.rules-link:hover { color: var(--gold); border-color: var(--gold); }

/* Idle */
.idle-screen {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: var(--text-muted);
}

.go-home-btn {
  padding: 12px 28px;
  background: var(--gold);
  color: #000;
  border-radius: var(--radius-sm);
  font-weight: 700;
}

/* Result overlay */
.result-overlay {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(4px);
}

.result-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 40px 36px;
  max-width: 480px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 18px;
  box-shadow: 0 20px 80px rgba(0,0,0,0.8);
  position: relative;
  overflow: hidden;
}

.result-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}

.result-card.won::before {
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}

.result-card.lost::before {
  background: linear-gradient(90deg, transparent, var(--crimson), transparent);
}

.result-big-icon { font-size: 72px; animation: icon-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }

@keyframes icon-bounce {
  from { transform: scale(0); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

.result-title {
  font-family: var(--font-display);
  font-size: 36px;
  font-weight: 900;
  color: var(--text);
}

.result-word-reveal {
  font-size: 15px;
  color: var(--text-muted);
}

.result-word-reveal strong {
  color: var(--gold);
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 0.12em;
}

.result-players {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rp-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: var(--bg2);
  border-radius: var(--radius-sm);
}

.rp-name { font-weight: 700; flex: 1; text-align: left; }
.rp-lives { display: flex; gap: 2px; font-size: 12px; }
.rp-score {
  font-family: var(--font-display);
  font-size: 15px;
  color: var(--gold);
  font-weight: 700;
}

.result-actions { display: flex; gap: 12px; }

.btn-gold {
  flex: 1;
  padding: 13px;
  background: linear-gradient(135deg, var(--gold), var(--gold2));
  color: #000;
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  transition: all 0.2s;
}

.btn-gold:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(240,192,64,0.35); }

.btn-outline {
  flex: 1;
  padding: 13px;
  background: transparent;
  color: var(--text-muted);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-outline:hover { color: var(--text); border-color: rgba(255,255,255,0.3); }

/* Game Area - 3 columns */
.game-area {
  flex: 1;
  display: grid;
  grid-template-columns: 220px 1fr 220px;
  gap: 0;
  min-height: 0;
}

/* Side panels */
.side-panel {
  padding: 20px 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--bg2);
}

.side-panel.left  { border-right: 1px solid rgba(255,255,255,0.05); }
.side-panel.right { border-left:  1px solid rgba(255,255,255,0.05); }

/* Player card inside game */
.player-card {
  background: var(--card);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: var(--radius);
  padding: 14px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}

.player-card.active {
  border-color: var(--gold);
  background: rgba(240,192,64,0.04);
  box-shadow: 0 0 16px rgba(240,192,64,0.12);
}

.player-card.dead { opacity: 0.4; filter: grayscale(0.6); }

.active-bar {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, var(--gold), var(--gold2));
}

.pc-top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.pc-avatar {
  width: 36px; height: 36px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display);
  font-size: 15px; font-weight: 900;
  flex-shrink: 0;
}

.av-0 { background: linear-gradient(135deg, #f0c040, #c9922a); color: #000; }
.av-1 { background: linear-gradient(135deg, #00d4ff, #005b80); color: #fff; }
.av-2 { background: linear-gradient(135deg, #ff2d6e, #7a0020); color: #fff; }
.av-3 { background: linear-gradient(135deg, #00e676, #004d25); color: #fff; }

.pc-meta { flex: 1; min-width: 0; }
.pc-name { font-size: 13px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pc-score { display: flex; align-items: baseline; gap: 3px; }
.sc-n { font-family: var(--font-display); font-size: 17px; font-weight: 900; color: var(--gold); line-height: 1; }
.sc-u { font-size: 10px; color: var(--text-muted); }

.crown { font-size: 16px; animation: crown-bob 1.5s ease-in-out infinite; }
@keyframes crown-bob {
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  50%       { transform: translateY(-3px) rotate(5deg); }
}

.pc-lives { display: flex; gap: 3px; flex-wrap: wrap; }
.lh { font-size: 15px; transition: all 0.3s; color: rgba(255,255,255,0.12); }
.lh.alive { color: var(--neon-pink); text-shadow: 0 0 6px rgba(255,45,110,0.5); }

.eliminated-badge {
  margin-top: 8px;
  text-align: center;
  font-size: 11px;
  font-weight: 700;
  color: var(--crimson);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* Center column */
.center-col {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  min-width: 0;
}

.wheel-center {
  display: flex;
  justify-content: center;
}

/* Responsive */
@media (max-width: 900px) {
  .game-area {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
  }

  .side-panel {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 12px;
    gap: 10px;
  }

  .side-panel.left  { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.05); }
  .side-panel.right { border-left: none;  border-top:    1px solid rgba(255,255,255,0.05); }

  .player-card { min-width: 160px; flex: 1; }
  .center-col { padding: 16px; }
}
</style>
