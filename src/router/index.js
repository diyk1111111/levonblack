import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import GameView from '@/views/GameView.vue'
import RulesView from '@/views/RulesView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/game',
      name: 'game',
      component: GameView
    },
    {
      path: '/rules',
      name: 'rules',
      component: RulesView
    }
  ]
})

export default router