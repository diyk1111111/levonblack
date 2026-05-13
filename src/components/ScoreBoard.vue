<template>
  <div class="scoreboard" v-if="scores.length > 0">
    <div class="sb-header">
      <span class="sb-icon">🏆</span>
      <h3 class="sb-title">Таблица рекордов</h3>
      <button class="clear-btn" @click="clearAll" title="Очистить">✕</button>
    </div>
    <div class="sb-list">
      <div v-for="(entry, i) in scores" :key="i" class="sb-row">
        <span class="rank" :class="{ gold: i === 0, silver: i === 1, bronze: i === 2 }">
          {{ i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1 }}
        </span>
        <span class="sb-name">{{ entry.name }}</span>
        <span class="sb-date">{{ entry.date }}</span>
        <span class="sb-score">{{ entry.score.toLocaleString() }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getScores, clearScores } from '@/utils/storage'

const scores = ref([])

onMounted(() => { scores.value = getScores() })

function clearAll() {
  clearScores()
  scores.value = []
}
</script>

<style scoped>
.scoreboard {
  width: 100%;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-card);
}

.sb-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 18px;
  border-bottom: 1px solid rgba(240,192,64,0.1);
  background: rgba(240,192,64,0.04);
}

.sb-icon { font-size: 18px; }

.sb-title {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold);
  flex: 1;
}

.clear-btn {
  width: 24px; height: 24px;
  border-radius: 50%;
  background: rgba(255,255,255,0.05);
  color: var(--text-muted);
  font-size: 11px;
  transition: all 0.2s;
}

.clear-btn:hover { background: rgba(192,23,58,0.2); color: var(--crimson); }

.sb-list { padding: 8px; display: flex; flex-direction: column; gap: 4px; }

.sb-row {
  display: grid;
  grid-template-columns: 36px 1fr auto auto;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  background: var(--bg2);
  border-radius: var(--radius-sm);
  font-size: 13px;
}

.rank { text-align: center; font-size: 12px; font-weight: 700; color: var(--text-muted); }

.sb-name { font-weight: 600; color: var(--text); }
.sb-date { font-size: 11px; color: var(--text-muted); }
.sb-score {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  color: var(--gold);
}
</style>
