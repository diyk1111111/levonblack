<template>
  <div class="wheel-wrapper">
    <div class="wheel-container">
      <svg
        class="wheel-svg"
        :class="{ spinning: isSpinning }"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        :style="{ transform: `rotate(${rotation}deg)`, transition: isSpinning ? `transform ${spinDuration}s cubic-bezier(0.17, 0.67, 0.12, 0.99)` : 'none' }"
      >
        <g v-for="(seg, i) in segments" :key="i">
          <path :d="seg.path" :fill="seg.color" stroke="#0a0a1a" stroke-width="1" />
          <text
            :x="seg.labelX"
            :y="seg.labelY"
            :transform="`rotate(${seg.labelAngle}, ${seg.labelX}, ${seg.labelY})`"
            text-anchor="middle"
            dominant-baseline="middle"
            font-size="9"
            font-family="Unbounded, sans-serif"
            font-weight="700"
            fill="#fff"
          >{{ seg.label }}</text>
        </g>
        <!-- Центр -->
        <circle cx="100" cy="100" r="12" fill="#0a0a1a" stroke="#f5c842" stroke-width="2"/>
      </svg>
      <!-- Стрелка -->
      <div class="wheel-arrow">▼</div>
    </div>

    <div class="wheel-result" v-if="wheelValue > 0">
      <span class="result-num">{{ wheelValue }}</span>
      <span class="result-label">очков</span>
    </div>
    <div class="wheel-result bankrupt" v-else-if="showBankrupt">
      <span class="result-num">БАНКРОТ!</span>
    </div>

    <button
      class="spin-btn"
      :disabled="isSpinDisabled || isSpinning"
      @click="handleSpin"
    >
      {{ isSpinning ? 'Крутится...' : 'Крутить барабан' }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGame } from '@/composables/useGame'

const { wheelValue, isSpinDisabled, spinWheel, gameStatus } = useGame()

const rotation = ref(0)
const isSpinning = ref(false)
const spinDuration = ref(3)
const showBankrupt = ref(false)

// Сектора барабана
const segmentValues = [100, 200, 300, 0, 150, 500, 250, 400]
const segmentColors = ['#e8304a', '#3a7bd5', '#f5c842', '#1a1a3a', '#2ecc71', '#9b59b6', '#e67e22', '#16a085']

const segments = computed(() => {
  const count = segmentValues.length
  const angleStep = 360 / count
  return segmentValues.map((val, i) => {
    const startAngle = (i * angleStep - 90) * (Math.PI / 180)
    const endAngle = ((i + 1) * angleStep - 90) * (Math.PI / 180)
    const r = 96
    const cx = 100, cy = 100
    const x1 = cx + r * Math.cos(startAngle)
    const y1 = cy + r * Math.sin(startAngle)
    const x2 = cx + r * Math.cos(endAngle)
    const y2 = cy + r * Math.sin(endAngle)
    const midAngle = (startAngle + endAngle) / 2
    const lr = r * 0.65
    return {
      path: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`,
      color: segmentColors[i],
      label: val === 0 ? 'Б!' : val.toString(),
      labelX: cx + lr * Math.cos(midAngle),
      labelY: cy + lr * Math.sin(midAngle),
      labelAngle: (i * angleStep + angleStep / 2)
    }
  })
})

function handleSpin() {
  if (isSpinning.value) return
  isSpinning.value = true
  showBankrupt.value = false

  const result = spinWheel()
  const extraSpins = 5 + Math.floor(Math.random() * 5)
  rotation.value += extraSpins * 360 + Math.random() * 360

  spinDuration.value = 3 + Math.random()

  setTimeout(() => {
    isSpinning.value = false
    if (result === 0) showBankrupt.value = true
  }, spinDuration.value * 1000 + 100)
}
</script>

<style scoped>
.wheel-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.wheel-container {
  position: relative;
  width: 200px;
  height: 200px;
}

.wheel-svg {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(245,200,66,0.2);
}

.wheel-arrow {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  color: var(--gold);
  text-shadow: 0 2px 8px rgba(0,0,0,0.5);
  line-height: 1;
}

.wheel-result {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.result-num {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 900;
  color: var(--gold);
}

.result-label { font-size: 13px; color: var(--text-muted); }

.bankrupt .result-num { color: var(--red); }

.spin-btn {
  padding: 12px 28px;
  background: var(--gold);
  color: #000;
  border-radius: var(--radius);
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: all 0.2s;
}

.spin-btn:disabled {
  background: rgba(255,255,255,0.1);
  color: var(--text-muted);
  cursor: not-allowed;
}

.spin-btn:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(245,200,66,0.3);
}
</style>
