<template>
  <Menu></Menu>
  <div class="container">
    <h1 class="center">Area Editar</h1>
    <div class="card">
      <div class="card-content">
        <h5>Modificar areas </h5>
        <form @submit.prevent="editar()">
          <p>Departamento: <input type="text" v-model="payload.nombreDepartamento" required /></p>
          <p>Encargado: <input type="text" v-model="payload.nombreEncargado" required /></p>
          <p>Nro Empleados: <input type="number" v-model="payload.numeroEmpleados" required /></p>
          <button type="submit" class="waves-effect waves-green btn-small">Agregar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
export default {
  name: 'AreaView',
  data() {
    const api = process.env.VUE_APP_API;
    return {
      api,
      items: [],
      payload: {
        nombreDepartamento: null,
        nombreEncargado: null,
        numeroEmpleados: null
      }
    }
  },
  methods: {
    update() {
      this.axios({
        method: 'get',
        url: this.api + '/areas/' + this.$route.params.id
      }).
        then((response) => {
          this.payload = response.data;
        }).
        catch((error) => {
          console.log(error);
        })
    },
    editar() {
      if (confirm("Estas seguro de cambiar los datos?.")) {
        this.axios({
          method: 'patch',
          url: this.api + '/areas/' + this.$route.params.id,
          data: this.payload
        }).
          then((response) => {
            console.log(response);
          }).
          catch((error) => {
            console.log(error);
          })
      }
    },
    agregar() {
      this.axios({
        method: 'post',
        url: this.api + '/areas',
        data: this.payload
      }).
        then((response) => {
          this.getList();
          console.log(response);
        }).
        catch((error) => {
          console.log(error);
        })
    },
    getList() {
      this.axios({
        method: 'get',
        url: this.api + '/areas'
      }).
        then((response) => {
          this.items = response.data;
        }).
        catch((error) => {
          console.log(error);
        })
    }
  },
  components: {
    Menu
  },
  mounted() {
    this.update();
  }
}
</script>
