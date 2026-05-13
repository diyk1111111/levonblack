<template>
  <div class="scoreboard" v-if="scores.length > 0">
    <h3 class="sb-title">🏆 Таблица рекордов</h3>
    <div class="sb-list">
      <div
        v-for="(entry, i) in scores"
        :key="i"
        class="sb-row"
      >
        <span class="rank">{{ i + 1 }}</span>
        <span class="sb-name">{{ entry.name }}</span>
        <span class="sb-date">{{ entry.date }}</span>
        <span class="sb-score">{{ entry.score }}</span>
      </div>
    </div>
    <button class="clear-btn" @click="clearAll">Очистить</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getScores, clearScores } from '@/utils/storage'

const scores = ref([])

onMounted(() => {
  scores.value = getScores()
})

function clearAll() {
  clearScores()
  scores.value = []
}
</script>

<style scoped>
.scoreboard {
  width: 100%;
  background: var(--bg2);
  border: 1px solid rgba(245,200,66,0.12);
  border-radius: var(--radius);
  padding: 20px;
}

.sb-title {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  color: var(--gold);
  margin-bottom: 14px;
}

.sb-list { display: flex; flex-direction: column; gap: 6px; }

.sb-row {
  display: grid;
  grid-template-columns: 28px 1fr auto auto;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: var(--bg);
  border-radius: 8px;
  font-size: 13px;
}

.rank {
  font-family: var(--font-display);
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 700;
}

.sb-name { font-weight: 600; }
.sb-date { color: var(--text-muted); font-size: 11px; }
.sb-score {
  font-family: var(--font-display);
  font-size: 14px;
  color: var(--gold);
  font-weight: 700;
}

.clear-btn {
  margin-top: 12px;
  font-size: 12px;
  color: var(--text-muted);
  background: transparent;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 6px;
  padding: 6px 14px;
  transition: all 0.2s;
}

.clear-btn:hover {
  color: var(--red);
  border-color: var(--red);
}
</style>
