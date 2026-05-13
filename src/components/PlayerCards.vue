<template>
  <div class="players-panel">
    <div
      v-for="(player, i) in players"
      :key="player.name"
      :class="['player-card', { active: i === currentPlayerIndex, dead: player.lives <= 0 }]"
    >
      <!-- Active indicator -->
      <div class="active-bar" v-if="i === currentPlayerIndex" />

      <div class="player-top">
        <div class="player-avatar" :class="`avatar-${i}`">
          {{ avatarLetter(player.name) }}
        </div>
        <div class="player-info">
          <div class="player-name">{{ player.name }}</div>
          <div class="player-score">
            <span class="score-num">{{ player.score }}</span>
            <span class="score-unit">очков</span>
          </div>
        </div>
        <div class="turn-crown" v-if="i === currentPlayerIndex">👑</div>
      </div>

      <!-- Lives -->
      <div class="lives-row">
        <span
          v-for="n in maxLives"
          :key="n"
          class="life-heart"
          :class="{ alive: n <= player.lives, dead: n > player.lives }"
        >♥</span>
      </div>

      <!-- Eliminated badge -->
      <div class="eliminated" v-if="player.lives <= 0">
        <span>💀 Выбыл</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGame } from '@/composables/useGame'
import { MAX_LIVES } from '@/store/gameStore'

const { players, currentPlayerIndex } = useGame()
const maxLives = MAX_LIVES

function avatarLetter(name) {
  return name ? name[0].toUpperCase() : '?'
}
</script>

<style scoped>
.players-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.player-card {
  background: var(--card);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: var(--radius);
  padding: 14px 16px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  box-shadow: var(--shadow-card);
}

.player-card.active {
  border-color: var(--gold);
  background: linear-gradient(135deg, #221510 0%, #1a0e14 100%);
  box-shadow: 0 0 20px rgba(240,192,64,0.15), var(--shadow-card);
}

.player-card.dead {
  opacity: 0.45;
  filter: grayscale(0.7);
}

.active-bar {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, var(--gold), var(--gold2));
  border-radius: 2px 0 0 2px;
}

.player-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.player-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 900;
  color: #000;
  flex-shrink: 0;
}

.avatar-0 { background: linear-gradient(135deg, #f0c040, #c9922a); }
.avatar-1 { background: linear-gradient(135deg, #00d4ff, #006b8f); color: #fff; }
.avatar-2 { background: linear-gradient(135deg, #ff2d6e, #8b0f28); color: #fff; }
.avatar-3 { background: linear-gradient(135deg, #00e676, #005c2e); color: #fff; }

.player-info { flex: 1; min-width: 0; }

.player-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.player-score {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-top: 1px;
}

.score-num {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 900;
  color: var(--gold);
  line-height: 1;
}

.score-unit {
  font-size: 11px;
  color: var(--text-muted);
}

.turn-crown {
  font-size: 18px;
  animation: crown-bob 1.5s ease-in-out infinite;
}

@keyframes crown-bob {
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  50% { transform: translateY(-4px) rotate(5deg); }
}

/* Lives */
.lives-row {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.life-heart {
  font-size: 16px;
  transition: all 0.3s;
}

.life-heart.alive {
  color: #ff2d6e;
  text-shadow: 0 0 8px rgba(255,45,110,0.5);
}

.life-heart.dead {
  color: rgba(255,255,255,0.12);
  text-shadow: none;
}

/* Eliminated */
.eliminated {
  margin-top: 8px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  color: var(--crimson);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
