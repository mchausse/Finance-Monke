import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		component: () => 
			import ('../views/LoginPage.vue'),
	},
	{
		path: '/folder/Expenses',
		component: () => 
			import ('../views/ExpensesPage.vue'),
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
