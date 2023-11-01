<template>
  <Menu></Menu>
  <router-view></router-view>
</template>


<script>
import Menu from '@/components/Menu.vue'
export default {
  name: 'App',
  props: {
    msg: String
  },
  compoments:{
    Menu
  }
}
</script>

<style lang="scss">
#app {
  
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
  color: #2c3e50;
}

// nav {
//   padding: 90px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
