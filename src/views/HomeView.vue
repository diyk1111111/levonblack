<template>
  <div class="home">
    <!-- Decorative background -->
    <div class="bg-orb bg-orb-1" />
    <div class="bg-orb bg-orb-2" />

    <div class="container">
      <!-- Logo -->
      <div class="logo-block">
        <div class="logo-badge">★ ТЕЛЕИГРА ★</div>
        <h1 class="logo-title">ПОЛЕ<br><span class="logo-gold">ЧУДЕС</span></h1>
        <p class="logo-sub">Угадай слово, вращая барабан!</p>
      </div>

      <div class="gold-divider" style="margin: 28px 0;" />

      <!-- Setup card -->
      <div class="setup-card">
        <h2 class="section-label">⚙ Настройка игры</h2>

        <!-- Player count -->
        <div class="field">
          <label class="field-label">Количество игроков</label>
          <div class="count-grid">
            <button
              v-for="n in [1,2,3,4]"
              :key="n"
              :class="['count-btn', { active: playerCount === n }]"
              @click="playerCount = n"
            >{{ n }}</button>
          </div>
        </div>

        <!-- Player names -->
        <div class="names-grid" :style="{ gridTemplateColumns: playerCount > 1 ? '1fr 1fr' : '1fr' }">
          <div class="field" v-for="i in playerCount" :key="i">
            <label class="field-label">{{ playerEmoji(i) }} Игрок {{ i }}</label>
            <input
              v-model="playerNames[i - 1]"
              :placeholder="`Имя игрока ${i}`"
              class="inp"
            />
          </div>
        </div>

        <!-- Category -->
        <div class="field">
          <label class="field-label">🎲 Категория</label>
          <select v-model="selectedCategory" class="inp">
            <option :value="null">— Случайная —</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>

        <button class="btn-start" @click="startGame">
          <span class="btn-start-icon">▶</span>
          Начать игру
        </button>
      </div>

      <!-- Nav links -->
      <div class="nav-links">
        <RouterLink to="/rules" class="nav-link">
          📖 Правила игры
        </RouterLink>
      </div>

      <!-- Scoreboard -->
      <ScoreBoard style="margin-top: 24px;" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useGameStore } from '@/store/gameStore'
import { getCategories } from '@/services/wordsService'
import ScoreBoard from '@/components/ScoreBoard.vue'

const router = useRouter()
const store = useGameStore()

const playerCount = ref(2)
const playerNames = ref(['Игрок 1', 'Игрок 2', 'Игрок 3', 'Игрок 4'])
const selectedCategory = ref(null)
const categories = getCategories()

const emojis = ['♠', '♥', '♦', '♣']
function playerEmoji(i) { return emojis[i - 1] }

function startGame() {
  const names = playerNames.value.slice(0, playerCount.value).map((n, i) => n.trim() || `Игрок ${i + 1}`)
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
  padding: 48px 16px 80px;
  position: relative;
  overflow: hidden;
}

.bg-orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
}
.bg-orb-1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(192,23,58,0.12) 0%, transparent 70%);
  top: -200px; left: -200px;
}
.bg-orb-2 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(240,192,64,0.07) 0%, transparent 70%);
  bottom: -100px; right: -100px;
}

.container {
  width: 100%;
  max-width: 560px;
  position: relative;
  z-index: 1;
}

/* Logo */
.logo-block {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.logo-badge {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: var(--gold2);
  text-transform: uppercase;
}

.logo-title {
  font-family: var(--font-display);
  font-size: clamp(56px, 14vw, 96px);
  font-weight: 900;
  line-height: 0.95;
  color: var(--text);
  text-shadow: 0 2px 40px rgba(240,192,64,0.15);
}

.logo-gold {
  color: var(--gold);
  text-shadow: 0 0 40px rgba(240,192,64,0.4), 0 2px 8px rgba(0,0,0,0.8);
}

.logo-sub {
  font-size: 15px;
  color: var(--text-muted);
  font-weight: 300;
  letter-spacing: 0.04em;
}

/* Setup Card */
.setup-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  box-shadow: var(--shadow-card);
  position: relative;
  overflow: hidden;
}

.setup-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}

.section-label {
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.05em;
}

.inp {
  width: 100%;
  padding: 11px 16px;
  background: var(--bg2);
  border: 1px solid rgba(240,192,64,0.12);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.inp:focus {
  border-color: var(--gold);
  box-shadow: 0 0 0 3px rgba(240,192,64,0.1);
}

.inp option { background: var(--bg2); }

.count-grid {
  display: flex;
  gap: 10px;
}

.count-btn {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-sm);
  background: var(--bg2);
  border: 1px solid rgba(255,255,255,0.08);
  color: var(--text-muted);
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  transition: all 0.2s;
}

.count-btn:hover {
  border-color: var(--gold);
  color: var(--gold);
}

.count-btn.active {
  background: var(--gold);
  color: #000;
  border-color: var(--gold);
  box-shadow: 0 0 20px var(--gold-glow);
}

.names-grid {
  display: grid;
  gap: 14px;
}

.btn-start {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
  background: linear-gradient(135deg, var(--gold) 0%, var(--gold2) 100%);
  color: #0d0508;
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: all 0.2s;
  box-shadow: 0 4px 20px rgba(240,192,64,0.3);
}

.btn-start:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(240,192,64,0.4);
}

.btn-start:active { transform: translateY(0); }

.btn-start-icon {
  font-size: 12px;
}

/* Nav links */
.nav-links {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 20px;
}

.nav-link {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 600;
  letter-spacing: 0.04em;
  transition: color 0.2s;
  padding: 8px 16px;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 20px;
}

.nav-link:hover {
  color: var(--gold);
  border-color: var(--gold);
}
</style>
