import Vue from 'vue'
import VueRouter from './my-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/about',
		name: 'About',
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
		children: [
			{
				path: '/about/info',
				component: {
					render(h) {
						return h('div', 'info page')
					}
				}
			}
		]
	}
]
const notFund404 = {
	path: '/404',
	name: 'fake',
	component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
}

const router = new VueRouter({
	routes,
	notFund: notFund404
})

export default router
