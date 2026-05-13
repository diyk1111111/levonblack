<template>
  <div class="wheel-section">
    <div class="wheel-wrap">
      <!-- Outer ring decoration -->
      <div class="wheel-outer-ring" />

      <!-- Pointer -->
      <div class="pointer">▼</div>

      <!-- SVG Wheel -->
      <svg
        class="wheel-svg"
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
        :style="{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? `transform ${spinDuration}s cubic-bezier(0.1, 0.6, 0.2, 1)` : 'none'
        }"
      >
        <!-- Segments -->
        <g v-for="(seg, i) in segments" :key="i">
          <path :d="seg.path" :fill="seg.fill" />
          <path :d="seg.path" fill="none" stroke="rgba(0,0,0,0.5)" stroke-width="1.5" />
          <text
            :x="seg.lx"
            :y="seg.ly"
            :transform="`rotate(${seg.textAngle}, ${seg.lx}, ${seg.ly})`"
            text-anchor="middle"
            dominant-baseline="middle"
            font-size="13"
            font-family="'Exo 2', sans-serif"
            font-weight="900"
            fill="#fff"
            style="text-shadow: 0 1px 3px rgba(0,0,0,0.8)"
          >{{ seg.label }}</text>
        </g>
        <!-- Center cap -->
        <circle cx="150" cy="150" r="22" fill="#0d0508" stroke="#f0c040" stroke-width="3"/>
        <text x="150" y="150" text-anchor="middle" dominant-baseline="middle"
          font-size="16" font-family="'Playfair Display', serif" font-weight="900" fill="#f0c040">★</text>
      </svg>

      <!-- Glow ring when spinning -->
      <div class="glow-ring" :class="{ active: isSpinning }" />
    </div>

    <!-- Result display -->
    <transition name="pop">
      <div v-if="spinResult && !isSpinning" class="spin-result" :class="spinResult.type">
        <template v-if="spinResult.type === 'bankrupt'">
          <div class="result-icon">💀</div>
          <div class="result-text">БАНКРОТ!</div>
          <div class="result-sub">Очки сброшены, ход переходит</div>
        </template>
        <template v-else>
          <div class="result-icon">🎯</div>
          <div class="result-value">{{ spinResult.value }}</div>
          <div class="result-sub">очков за букву</div>
        </template>
      </div>
    </transition>

    <!-- Spin button -->
    <button
      class="spin-btn"
      :disabled="isSpinDisabled || isSpinning"
      @click="handleSpin"
    >
      <span v-if="isSpinning" class="spin-dots">
        <span></span><span></span><span></span>
      </span>
      <span v-else>🎡 Крутить барабан</span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGame } from '@/composables/useGame'

const { isSpinDisabled, spinWheel } = useGame()

const rotation   = ref(0)
const isSpinning = ref(false)
const spinDuration = ref(4)
const spinResult = ref(null)

// 12 segments
const SEGMENTS = [
  { label: '100',   fill: '#8b2fc9' },
  { label: '300',   fill: '#1a6fb5' },
  { label: 'БАНКРОТ', fill: '#8b0f28' },
  { label: '200',   fill: '#0f7a5a' },
  { label: '500',   fill: '#b5731a' },
  { label: '150',   fill: '#1a6fb5' },
  { label: '400',   fill: '#8b2fc9' },
  { label: 'БАНКРОТ', fill: '#8b0f28' },
  { label: '700',   fill: '#1a6fb5' },
  { label: '250',   fill: '#0f7a5a' },
  { label: '350',   fill: '#b5731a' },
  { label: '600',   fill: '#8b2fc9' },
]

const CX = 150, CY = 150, R = 145

const segments = computed(() => {
  const n = SEGMENTS.length
  const step = 360 / n
  return SEGMENTS.map((seg, i) => {
    const a1 = (i * step - 90) * Math.PI / 180
    const a2 = ((i + 1) * step - 90) * Math.PI / 180
    const x1 = CX + R * Math.cos(a1)
    const y1 = CY + R * Math.sin(a1)
    const x2 = CX + R * Math.cos(a2)
    const y2 = CY + R * Math.sin(a2)
    const mid = (a1 + a2) / 2
    const lr = R * 0.68
    return {
      path: `M ${CX} ${CY} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${R} ${R} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`,
      fill: seg.fill,
      label: seg.label,
      lx: (CX + lr * Math.cos(mid)).toFixed(2),
      ly: (CY + lr * Math.sin(mid)).toFixed(2),
      textAngle: i * step + step / 2,
    }
  })
})

function handleSpin() {
  if (isSpinning.value) return
  isSpinning.value = true
  spinResult.value = null

  const result = spinWheel()
  const extraSpins = 5 + Math.floor(Math.random() * 6)
  rotation.value += extraSpins * 360 + Math.random() * 360
  spinDuration.value = 3.5 + Math.random() * 1.5

  setTimeout(() => {
    isSpinning.value = false
    spinResult.value = result
  }, spinDuration.value * 1000 + 100)
}
</script>

<style scoped>
.wheel-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.wheel-wrap {
  position: relative;
  width: 320px;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wheel-outer-ring {
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: 3px solid var(--gold2);
  background: transparent;
  box-shadow:
    0 0 20px rgba(240,192,64,0.15),
    inset 0 0 20px rgba(240,192,64,0.05);
}

.pointer {
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 28px;
  color: var(--gold);
  text-shadow: 0 0 12px var(--gold), 0 2px 6px rgba(0,0,0,0.8);
  z-index: 10;
  line-height: 1;
}

.wheel-svg {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  filter: drop-shadow(0 4px 20px rgba(0,0,0,0.8));
}

.glow-ring {
  position: absolute;
  inset: -12px;
  border-radius: 50%;
  border: 2px solid transparent;
  transition: all 0.3s;
  pointer-events: none;
}

.glow-ring.active {
  border-color: var(--gold);
  box-shadow: 0 0 40px rgba(240,192,64,0.5), 0 0 80px rgba(240,192,64,0.2);
  animation: ring-pulse 0.8s ease-in-out infinite alternate;
}

@keyframes ring-pulse {
  from { box-shadow: 0 0 20px rgba(240,192,64,0.3); }
  to   { box-shadow: 0 0 60px rgba(240,192,64,0.6), 0 0 100px rgba(240,192,64,0.2); }
}

/* Result */
.spin-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 14px 28px;
  border-radius: var(--radius);
  border: 1px solid;
  text-align: center;
}

.spin-result.points {
  background: rgba(240,192,64,0.08);
  border-color: rgba(240,192,64,0.3);
}

.spin-result.bankrupt {
  background: rgba(192,23,58,0.12);
  border-color: rgba(192,23,58,0.4);
}

.result-icon { font-size: 24px; }

.result-value {
  font-family: var(--font-display);
  font-size: 36px;
  font-weight: 900;
  color: var(--gold);
  line-height: 1;
}

.result-sub {
  font-size: 12px;
  color: var(--text-muted);
}

.spin-result.bankrupt .result-text {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 900;
  color: var(--crimson);
}

/* Spin Button */
.spin-btn {
  padding: 14px 36px;
  background: linear-gradient(135deg, var(--gold) 0%, var(--gold2) 100%);
  color: #0d0508;
  border-radius: 50px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  box-shadow: 0 4px 20px rgba(240,192,64,0.3);
  transition: all 0.2s;
  min-width: 220px;
}

.spin-btn:not(:disabled):hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(240,192,64,0.45);
}

.spin-btn:disabled {
  background: rgba(255,255,255,0.08);
  color: var(--text-muted);
  box-shadow: none;
  cursor: not-allowed;
}

/* Loading dots */
.spin-dots {
  display: inline-flex;
  gap: 5px;
  align-items: center;
}

.spin-dots span {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--bg);
  animation: dot-bounce 0.8s ease-in-out infinite;
}

.spin-dots span:nth-child(2) { animation-delay: 0.15s; }
.spin-dots span:nth-child(3) { animation-delay: 0.3s; }

@keyframes dot-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

/* Transitions */
.pop-enter-active {
  animation: pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pop-leave-active {
  animation: pop-in 0.2s ease reverse;
}
@keyframes pop-in {
  from { opacity: 0; transform: scale(0.7); }
  to   { opacity: 1; transform: scale(1); }
}
</style>
