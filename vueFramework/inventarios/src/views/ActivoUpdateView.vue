<template>
  <Menu></Menu>
  <div class="container">
    <h1 class="center">Activos Editar</h1>
    <div class="card">
      <div class="card-content">
        <h5>Modificar activos </h5>
        <form @submit.prevent="editar()">
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
    update() {
      this.axios({
        method: 'get',
        url: this.api + '/activos/' + this.$route.params.id
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
          url: this.api + '/activos/' + this.$route.params.id,
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
    getList() {
      this.axios({
        method: 'get',
        url: this.api + '/activos'
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