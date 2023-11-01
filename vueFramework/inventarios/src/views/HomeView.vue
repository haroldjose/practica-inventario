<template>
  <div class="home">
    <Menu></Menu>
    <div class="container">
      <div class="card center">
        <div class="card-content">
          <ul>
            <h4>Registro de areas</h4>
            <li><router-link to="/area">Areas</router-link> </li>
            <h4>Registro de activos</h4>
            <li><router-link to="/activo">Activos</router-link> </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from '@/components/Menu.vue'
export default {
  name: 'HomeView',
  components: {
    Menu
  }
}
</script>
