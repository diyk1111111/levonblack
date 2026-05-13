<template>
  <div class="rules-page">
    <div class="bg-orb bg-orb-1" />
    <div class="bg-orb bg-orb-2" />

    <div class="container">
      <!-- Header -->
      <div class="page-header">
        <RouterLink to="/" class="back-btn">← Назад</RouterLink>
        <div class="header-badge">📖 Правила игры</div>
      </div>

      <h1 class="page-title">
        ПОЛЕ <span class="gold">ЧУДЕС</span>
      </h1>
      <p class="page-sub">Угадай слово раньше, чем закончатся жизни!</p>

      <div class="gold-divider" style="margin: 28px 0;" />

      <!-- Rules sections -->
      <div class="rules-grid">

        <div class="rule-card">
          <div class="rule-num">01</div>
          <div class="rule-icon">🎯</div>
          <h3 class="rule-title">Цель игры</h3>
          <p class="rule-text">
            Угадать загаданное слово, называя буквы по одной.
            Слово скрыто за закрытыми плитками.
            Побеждает игрок с наибольшим количеством очков.
          </p>
        </div>

        <div class="rule-card">
          <div class="rule-num">02</div>
          <div class="rule-icon">🎡</div>
          <h3 class="rule-title">Вращение барабана</h3>
          <p class="rule-text">
            Перед каждой попыткой игрок <strong>обязан</strong> прокрутить барабан.
            Выпавшее число — количество очков за каждую правильно названную букву.
            Например: 300 × 2 буквы = 600 очков.
          </p>
        </div>

        <div class="rule-card">
          <div class="rule-num">03</div>
          <div class="rule-icon">♥</div>
          <h3 class="rule-title">Жизни игроков</h3>
          <p class="rule-text">
            У каждого игрока <strong>{{ MAX_LIVES }} жизней</strong>.
            При неверно названной букве игрок теряет 1 жизнь и передаёт ход.
            Если все жизни кончились — игрок выбывает.
            Когда жизни заканчиваются у всех — игра завершается поражением.
          </p>
        </div>

        <div class="rule-card highlight-gold">
          <div class="rule-num">04</div>
          <div class="rule-icon">💀</div>
          <h3 class="rule-title">Банкрот!</h3>
          <p class="rule-text">
            Если барабан остановился на секторе <strong>БАНКРОТ</strong> —
            игрок теряет все накопленные очки, одну жизнь,
            и ход переходит следующему игроку.
          </p>
        </div>

        <div class="rule-card">
          <div class="rule-num">05</div>
          <div class="rule-icon">✅</div>
          <h3 class="rule-title">Угаданная буква</h3>
          <p class="rule-text">
            Если буква есть в слове — очки начисляются, плитки открываются.
            Игрок <strong>сохраняет ход</strong> и должен снова крутить барабан
            перед следующей попыткой.
          </p>
        </div>

        <div class="rule-card">
          <div class="rule-num">06</div>
          <div class="rule-icon">🏆</div>
          <h3 class="rule-title">Победа</h3>
          <p class="rule-text">
            Игра заканчивается, когда все буквы слова открыты.
            Победителем объявляется игрок, чья буква открыла последнюю плитку.
            Результаты сохраняются в таблице рекордов.
          </p>
        </div>

      </div>

      <!-- Keyboard guide -->
      <div class="keyboard-guide">
        <h3 class="guide-title">🎨 Цветовая раскладка клавиатуры</h3>
        <div class="guide-items">
          <div class="guide-item">
            <span class="key-demo blue">А</span>
            <span>Гласные буквы — синяя подсветка</span>
          </div>
          <div class="guide-item">
            <span class="key-demo gold">К</span>
            <span>Согласные буквы — золотая подсветка</span>
          </div>
          <div class="guide-item">
            <span class="key-demo green">О</span>
            <span>Угаданная буква — зелёная</span>
          </div>
          <div class="guide-item">
            <span class="key-demo red">Х</span>
            <span>Неверная буква — красная, зачёркнута</span>
          </div>
        </div>
      </div>

      <!-- Tips -->
      <div class="tips-block">
        <h3 class="tips-title">💡 Советы</h3>
        <ul class="tips-list">
          <li>Начинайте с самых частых букв: <strong>А, О, Е, И, Н, Т, С, Р</strong></li>
          <li>Читайте подсказку внимательно — она помогает сузить варианты</li>
          <li>Следите за жизнями соперников — стратегия важна!</li>
          <li>При банкроте очки сгорают, но у вас есть шанс отыграться</li>
        </ul>
      </div>

      <!-- Back button -->
      <div class="bottom-nav">
        <RouterLink to="/" class="btn-start-game">
          🎮 Начать игру
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { MAX_LIVES } from '@/store/gameStore'
</script>

<style scoped>
.rules-page {
  min-height: 100vh;
  padding: 40px 16px 80px;
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
  background: radial-gradient(circle, rgba(192,23,58,0.1) 0%, transparent 70%);
  top: -100px; right: -200px;
}
.bg-orb-2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%);
  bottom: 0; left: -100px;
}

.container {
  max-width: 760px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Header */
.page-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.back-btn {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  padding: 7px 14px;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  transition: all 0.2s;
}

.back-btn:hover { color: var(--gold); border-color: var(--gold); }

.header-badge {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
}

/* Title */
.page-title {
  font-family: var(--font-display);
  font-size: clamp(42px, 10vw, 72px);
  font-weight: 900;
  line-height: 1;
  text-align: center;
  color: var(--text);
}

.gold { color: var(--gold); text-shadow: 0 0 30px rgba(240,192,64,0.3); }

.page-sub {
  text-align: center;
  color: var(--text-muted);
  font-size: 15px;
  margin-top: 10px;
  font-weight: 300;
}

/* Rules grid */
.rules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
  margin-top: 8px;
}

.rule-card {
  background: var(--card);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: var(--radius);
  padding: 24px;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s;
}

.rule-card:hover { transform: translateY(-2px); }

.rule-card.highlight-gold {
  border-color: rgba(192,23,58,0.3);
  background: linear-gradient(135deg, #1a0a0d 0%, #160c10 100%);
}

.rule-card.highlight-gold::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, var(--crimson), transparent);
}

.rule-num {
  position: absolute;
  top: 16px; right: 20px;
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 900;
  color: rgba(255,255,255,0.04);
  line-height: 1;
}

.rule-icon { font-size: 28px; margin-bottom: 10px; }

.rule-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 10px;
}

.rule-text {
  font-size: 14px;
  color: var(--text-dim);
  line-height: 1.7;
}

.rule-text strong { color: var(--gold); }

/* Keyboard guide */
.keyboard-guide {
  margin-top: 28px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
}

.guide-title {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 18px;
}

.guide-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}

.guide-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: var(--text-dim);
}

.key-demo {
  width: 36px; height: 36px;
  border-radius: 7px;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-body);
  font-size: 14px; font-weight: 700;
  flex-shrink: 0;
}

.key-demo.blue  { background: rgba(0,212,255,0.12); border: 1px solid rgba(0,212,255,0.3); color: #00d4ff; }
.key-demo.gold  { background: rgba(240,192,64,0.1);  border: 1px solid rgba(240,192,64,0.3); color: var(--gold); }
.key-demo.green { background: rgba(0,230,118,0.12); border: 1px solid rgba(0,230,118,0.3); color: #00e676; }
.key-demo.red   { background: rgba(192,23,58,0.12); border: 1px solid rgba(192,23,58,0.3); color: #c0173a; }

/* Tips */
.tips-block {
  margin-top: 20px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
}

.tips-title {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 14px;
}

.tips-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tips-list li {
  font-size: 14px;
  color: var(--text-dim);
  padding-left: 20px;
  position: relative;
  line-height: 1.6;
}

.tips-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--gold2);
}

.tips-list li strong { color: var(--text); }

/* Bottom nav */
.bottom-nav {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}

.btn-start-game {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 40px;
  background: linear-gradient(135deg, var(--gold), var(--gold2));
  color: #0d0508;
  border-radius: 50px;
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  box-shadow: 0 6px 24px rgba(240,192,64,0.3);
  transition: all 0.2s;
}

.btn-start-game:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 32px rgba(240,192,64,0.4);
}
</style>
