<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/404">404</router-link>
    </div>

    <div>
      data：
      {{$store.state}}
    </div>
    <div>
      全局状态:
      <p @click="$store.commit('add')">{{$store.state.count}}</p>
    </div>
    <div>
      <p @click="$store.dispatch('add')">{{$store.state.count}}</p>
    </div>
    <p>{{$store.getters.doubleCounter}}</p>
    <p>{{$store.cpGetters.doubleCounter}}</p>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
