// 实现store类

// 1、维持I一个响应式状态state
// 2、实现commit
// 3、实现dispatch
// 4、getters
// 5、挂载store

let Vue

class Store {
  constructor({ state, mutations, actions, getters }) {
    console.log(state)
    // 1.保存选项
    this._state = state
    this._mutations = mutations || {}
    this._actions = actions || {}
    // 内部方法绑定this
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)

    // 2.做响应式state属性
    this._vm = new Vue({
      data: function() {
        return { $$state: state }
      },
    })
    // 3.getters
    // 动态设置getters属性  还有 响应式
    // 附加能否利用上vue的compute属性
    const _getters = {}
    console.log('getters实现')
    for (let key in getters) {
      const innerState = this.state
      // const item = getters[key]
      Object.defineProperty(_getters, key, {
        get: function() {
          console.log(this.state)
          return getters[key](innerState)
        },
        enumerable: true,
      })
    }
    this.getters = _getters
  }

  get state() {
    //_data 响应对象 $data原始对象
    return this._vm._data.$$state
  }

  set state(v) {
    console.log("error can't set val")
  }

  commit(type, payload) {
    // 获取mutations
    const entry = this._mutations[type]
    if (!entry) {
      console.log('获取不到mutations')
      return
    }
    entry(this.state, payload)
  }

  dispatch(type, payload) {
    const entry = this._actions[type]
    if (!entry) {
      console.log('获取不到actions')
      return
    }
    entry(this, payload)
  }
}

function install(_vue) {
  Vue = _vue
  // 延迟挂载store
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    },
  })
}

export default {
  Store,
  install,
}
