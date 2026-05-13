<template>
  <div class="home">
    <div class="hero">
      <h1 class="title">ПОЛЕ<br><span class="accent">ЧУДЕС</span></h1>
      <p class="subtitle">Угадай слово, вращая барабан!</p>

      <div class="setup-card">
        <h2 class="setup-title">Настройка игры</h2>

        <!-- Игроки -->
        <div class="field">
          <label>Количество игроков</label>
          <div class="player-btns">
            <button
              v-for="n in [1,2,3,4]"
              :key="n"
              :class="['btn-count', { active: playerCount === n }]"
              @click="playerCount = n"
            >{{ n }}</button>
          </div>
        </div>

        <!-- Имена -->
        <div class="field" v-for="i in playerCount" :key="i">
          <label>Игрок {{ i }}</label>
          <input
            v-model="playerNames[i - 1]"
            :placeholder="`Имя игрока ${i}`"
            class="inp"
          />
        </div>

        <!-- Категория -->
        <div class="field">
          <label>Категория</label>
          <select v-model="selectedCategory" class="inp">
            <option :value="null">Случайная</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>

        <button class="btn-start" @click="startGame">Начать игру</button>
      </div>

      <!-- Лидерборд под кнопкой -->
      <ScoreBoard style="margin-top: 32px;" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/store/gameStore'
import { getCategories } from '@/services/wordsService'
import ScoreBoard from '@/components/ScoreBoard.vue'

const router = useRouter()
const store = useGameStore()

const playerCount = ref(2)
const playerNames = ref(['Игрок 1', 'Игрок 2', 'Игрок 3', 'Игрок 4'])
const selectedCategory = ref(null)
const categories = getCategories()

function startGame() {
  const names = playerNames.value.slice(0, playerCount.value).map((n, i) => n || `Игрок ${i + 1}`)
  store.startGame(names, selectedCategory.value)
  router.push('/game')
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 16px 60px;
  background: var(--bg);
}

.hero {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-family: var(--font-display);
  font-size: clamp(48px, 12vw, 96px);
  font-weight: 900;
  line-height: 1;
  text-align: center;
  color: var(--text);
  text-shadow: 0 0 40px rgba(245, 200, 66, 0.3);
}

.accent { color: var(--gold); }

.subtitle {
  margin-top: 12px;
  font-size: 16px;
  color: var(--text-muted);
  text-align: center;
}

.setup-card {
  width: 100%;
  margin-top: 36px;
  background: var(--bg2);
  border: 1px solid rgba(245, 200, 66, 0.15);
  border-radius: var(--radius);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.setup-title {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field label {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 600;
}

.inp {
  width: 100%;
  padding: 10px 14px;
  background: var(--bg);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  color: var(--text);
  font-family: var(--font-body);
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
}

.inp:focus { border-color: var(--gold); }

.player-btns {
  display: flex;
  gap: 8px;
}

.btn-count {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background: var(--bg);
  border: 1px solid rgba(255,255,255,0.1);
  color: var(--text-muted);
  font-family: var(--font-display);
  font-size: 16px;
  transition: all 0.2s;
}

.btn-count.active {
  background: var(--gold);
  color: #000;
  border-color: var(--gold);
}

.btn-start {
  margin-top: 8px;
  padding: 14px;
  background: var(--gold);
  color: #000;
  border-radius: var(--radius);
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: transform 0.15s, box-shadow 0.15s;
}

.btn-start:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(245, 200, 66, 0.35);
}

.btn-start:active { transform: translateY(0); }
</style>
