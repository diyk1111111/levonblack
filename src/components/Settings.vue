<template>
  <div class="settings">
    <h3 class="s-title">⚙️ Настройки</h3>

    <div class="field">
      <label>Игроков по умолчанию</label>
      <div class="btns">
        <button
          v-for="n in [1,2,3,4]"
          :key="n"
          :class="['btn-n', { active: settings.playerCount === n }]"
          @click="settings.playerCount = n; save()"
        >{{ n }}</button>
      </div>
    </div>

    <div class="field">
      <label>Сложность</label>
      <div class="btns">
        <button
          v-for="d in difficulties"
          :key="d.value"
          :class="['btn-n', { active: settings.difficulty === d.value }]"
          @click="settings.difficulty = d.value; save()"
        >{{ d.label }}</button>
      </div>
    </div>

    <p class="saved" v-if="savedMsg">Сохранено ✓</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { saveSettings, loadSettings } from '@/utils/storage'

const settings = ref({ playerCount: 2, difficulty: 'normal' })
const savedMsg = ref(false)

const difficulties = [
  { value: 'easy', label: 'Легко' },
  { value: 'normal', label: 'Нормально' },
  { value: 'hard', label: 'Сложно' }
]

onMounted(() => {
  settings.value = loadSettings()
})

function save() {
  saveSettings(settings.value)
  savedMsg.value = true
  setTimeout(() => (savedMsg.value = false), 1500)
}
</script>

<style scoped>
.settings {
  background: var(--bg2);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: var(--radius);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.s-title {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
}

.field { display: flex; flex-direction: column; gap: 8px; }
.field label { font-size: 12px; color: var(--text-muted); font-weight: 600; }

.btns { display: flex; gap: 6px; flex-wrap: wrap; }

.btn-n {
  padding: 6px 14px;
  border-radius: 7px;
  background: var(--bg);
  border: 1px solid rgba(255,255,255,0.1);
  color: var(--text-muted);
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 700;
  transition: all 0.15s;
}

.btn-n.active {
  background: var(--gold);
  color: #000;
  border-color: var(--gold);
}

.saved { font-size: 12px; color: #2ecc71; }
</style>
