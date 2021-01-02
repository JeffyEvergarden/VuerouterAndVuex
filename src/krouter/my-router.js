let Vue

class VueRouter {
  constructor(options) {
    this.$options = options
    const initVal = window.location.hash.slice(1) || '/'
    Vue.util.defineReactive(this, 'current', initVal)
    // this.current = window.location.hash.slice(1) || '/'
    window.addEventListener('hashchange', () => {
      this.current = window.location.hash.slice(1)
    })
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
  })

  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    render(h) {
      return h(
        'a',
        {
          attrs: {
            href: '#' + this.to,
          },
        },
        this.$slots.default
      )
    },
  })

  Vue.component('router-view', {
    render(h) {
      console.log('执行-routerview渲染--')
      let component = null
      const route = this.$router.$options.routes.find(
        (route) => route.path === this.$router.current
      )
      if (route) {
        component = route.component
      } else {
        component = this.$router.$options.notFund
      }
      console.log(component)
      return h(component)
    },
  })
}

export default VueRouter
