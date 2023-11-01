<template>
  <Menu></Menu>
  <div class="container">
    <h1 class="center">Activos</h1>
    <div class="card">
      <div class="card-content">
        <h5>Registrar activos </h5>
        <form @submit.prevent="agregar()">
          <p>Tipo activo: <input type="text" v-model="payload.tipoActivo" required /></p>
          <p>Marca: <input type="text" v-model="payload.marca" required /></p>
          <p>Modelo: <input type="text" v-model="payload.modelo" required /></p>
          <P>Estado:
          <p>
            <label>
              <input class="with-gap" name="group3" type="radio" value="Nuevo" v-model="payload.estado" />
              <span>Nuevo</span>
            </label>
          </p>
          <p>
            <label>
              <input class="with-gap" name="group3" type="radio" value="Usado" v-model="payload.estado" />
              <span>Usado</span>
            </label>
          </p>
          <p>
            <label>
              <input class="with-gap" name="group3" type="radio" value="Desuso" v-model="payload.estado" />
              <span>Desuso</span>
            </label>
          </p>
          </P>
          <p>IdArea: <input type="number" v-model="payload.areaId" required /></p>
          <button type="submit" class="waves-effect waves-green btn-small">Agregar</button>
        </form>
      </div>
    </div>
    <!-- buscar -->
    <div class="card">
      <div class="card-content">
        <form @submit.prevent="getList()">
          <h5>Buscar producto</h5>
          <p>Tipo de producto: <input type="search" v-model="search" @search="getList()" /></p>
          <button type="submit" class="waves-effect waves-green btn-small">buscar</button>
        </form>
      </div>
    </div>
    <!-- filtrar -->
    <div class="card">
      <div class="card-content">
        <h5>filtros</h5>
        <div class="input-field ">
          <select @change="filter('estado', $event.target.value)">
            <option value="" selected>todos</option>
            <option value="Nuevo">nuevo</option>
            <option value="Usado">usado</option>
            <option value="Desuso">desuso</option>
          </select>
          <!-- <label>Materialize Select</label> -->
        </div>
      </div>
    </div>

    <!-- mostar -->
    <div class="card">
      <div class="card-content">
        <h5>Mostrar activos </h5>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Tipo activo</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Estado</th>
              <th>AreaId</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in items">
              <td>{{ item.id }}</td>
              <td>{{ item.tipoActivo }}</td>
              <td>{{ item.marca }}</td>
              <td>{{ item.modelo }}</td>
              <td>{{ item.estado }}</td>
              <td>{{ item.areaId }}</td>
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
  name: 'ActivoView',
  data() {
    const api = process.env.VUE_APP_API;
    return {
      api,
      items: [],
      search: '',
      toFilter: '',
      payload: {
        tipoActivo: null,
        marca: null,
        modelo: null,
        estado: null,
        areaId: null
      }
    }
  },
  methods: {
    filter(name, value) {
      console.log(value === '' ? '' : name + '=' + value);
      this.toFilter = value === '' ? '' : '&' + name + '=' + value;
      this.getList();
    },
    actualizar(id) {
      this.$router.push('/activo/' + id);
    },
    eliminar(id) {
      if (confirm("Esta seguro de eliminar?.")) {
        this.axios({
          method: 'delete',
          url: this.api + '/activos/' + id
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
        url: this.api + '/activos',
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
    getList(name, value) {
      console.log(this.api + '/activos?q=' + this.search + this.toFilter);
      this.axios({
        method: 'get',
        url: this.api + '/activos?q=' + this.search + this.toFilter
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
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  }
}
</script>

