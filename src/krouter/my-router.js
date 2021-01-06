let Vue

class VueRouter {
	constructor(options) {
		this.$options = options
		const initVal = window.location.hash.slice(1) || '/'
		this.current = initVal
		console.log('this.current')
		console.log(this.current)
		Vue.util.defineReactive(this, 'matched', [])
		// this.current = window.location.hash.slice(1) || '/'
		this.hashChange = this.hashChange.bind(this)
		window.addEventListener('hashchange', this.hashChange)
	}

	hashChange() {
		this.current = window.location.hash.slice(1)
		console.log('this.current')
		console.log(this.current)
		this.matched = []
		this.match()
	}

	match(routes) {
		routes = routes || this.$options.routes

		for (const route of routes) {
			if (route.path === '/' && this.current === '/') {
				this.matched.push(route)
				return
			}
			if (route.path !== '/' && this.current.indexOf(route.path) > -1) {
				this.matched.push(route)
			}
			if (route.children && route.children.length > 0) {
				route.children.forEach((ele) => {
					if (ele.path !== '/' && this.current.indexOf(ele.path) > -1) {
						this.matched.push(ele)
					}
				})
			}
		}
	}
}

VueRouter.install = function(_Vue) {
	Vue = _Vue
	// 利用全局混入，延迟执行下面的代码，这样可以获取router实例
	Vue.mixin({
		beforeCreate() {
			// 组件实例
			if (this.$options.router) {
				Vue.prototype.$router = this.$options.router
			}
		},
		beforeDesotry() {
			window.removeEventListener('hashchange', this.hashChange)
		}
	})

	Vue.component('router-link', {
		props: {
			to: {
				type: String,
				required: true
			}
		},
		render(h) {
			return h(
				'a',
				{
					attrs: {
						href: '#' + this.to
					}
				},
				this.$slots.default
			)
		}
	})

	Vue.component('router-view', {
		render(h) {
			this.$vnode.data.routerView = true
			let depth = 0
			let parent = this.$parent
			while (parent) {
				const vnodeData = parent.$vnode && parent.$vnode.data
				if (vnodeData && vnodeData.routerView) {
					// 说明当前parent时routerview
					depth++
				}
				parent = parent.$parent
			}
			console.log('执行-routerview渲染-- 与' + this.$router.current + '比较')
			let component = null
			// 获取path对应的component
			const route = this.$router.matched[depth]
			console.log(depth)
			console.log(this.$router.matched)
			if (route) {
				component = route.component
			} else {
				component = this.$router.$options.notFund.component
			}
			// console.log(component)
			return h(component)
		}
	})
}

export default VueRouter
