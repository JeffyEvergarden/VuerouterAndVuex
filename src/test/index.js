import store from './test.js'

store.getVal()
store.init(2)
store.getVal()

const fake = store.getVal

const data = {
  fake
}

fake()
data.fake()