<template>
  <Menu></Menu>
  <div class="container">
    <h1 class="center">Area</h1>
    <!-- agregar -->
    <div class="card">
      <div class="card-content">
        <h5>Registrar areas </h5>
        <form @submit.prevent="agregar()">
          <p>Departamento: <input type="text" v-model="payload.nombreDepartamento" required /></p>
          <p>Encargado: <input type="text" v-model="payload.nombreEncargado" required /></p>
          <p>Nro Empleados: <input type="number" v-model="payload.numeroEmpleados" required /></p>
          <button type="submit" class="waves-effect waves-green btn-small">Agregar</button>
        </form>
      </div>
    </div>

    <!-- buscar -->
    <div class="card">
      <div class="card-content">
        <form @submit.prevent="getList()">
          <h5>Buscar departamento</h5>
          <p>Departamento o nombre encargado: <input type="search" v-model="search" @search="getList()" /></p>
          <button type="submit" class="waves-effect waves-green btn-small">buscar</button>
        </form>
      </div>
    </div>
  
    <!-- mostrar -->
    <div class="card">
      <div class="card-content">
        <h5> Mostrar areas </h5>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Departamento</th>
              <th>Encargado</th>
              <th>Nro Empleados</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in items">
              <td>{{ item.id }}</td>
              <td>{{ item.nombreDepartamento }}</td>
              <td>{{ item.nombreEncargado }}</td>
              <td>{{ item.numeroEmpleados }}</td>
              <td><a class="waves-effect red darken-2 btn-small"><i class="material-icons"
                    @click="eliminar(item.id)">delete</i></a></td>
              <td><a class="waves-effect blue darken-2 btn-small"><i class="material-icons"
                    @click="actualizar(item.id)">edit</i></a></td>
            </tr>
          </tbody>
        </table>
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
      search: '',
      payload: {
        nombreDepartamento: null,
        nombreEncargado: null,
        numeroEmpleados: null
      }
    }
  },
  methods: {
    actualizar(id) {
      this.$router.push('/area/' + id);
    },
    eliminar(id) {
      if (confirm("Esta seguro de eliminar?.")) {
        this.axios({
          method: 'delete',
          url: this.api + '/areas/' + id
        }).
          then((response) => {
            this.getList();
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
        url: this.api + '/areas?q=' + this.search
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
    this.getList();
  }
}
</script>
