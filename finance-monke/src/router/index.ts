import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/folder/Inbox'
  },
  {
    path: '/folder/Transactions',
    component: () => 
        import ('../views/TransactionsPage.vue'),
  },
  {
    path: '/folder/Incomes',
    component: () => 
        import ('../views/IncomesPage.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
