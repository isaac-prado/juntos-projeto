/* eslint-disable prettier/prettier */
<template>
  <div id="app">
    <div id="top">
      <img src="./assets/logo.png.webp" alt="Logo da Juntos Energia">

      <button 
        type="button" 
        @click="showModal"
        class="btn"
        >
        Inserir um Novo Produto
      </button>
    </div>

    <router-view/>

    <InsertModal
      v-show="isModalVisible"
      @close="closeModal"
      @product-added="onProductAdded"
    />

  </div>
</template>

<script>
  import InsertModal from "./components/InsertModal.vue";

  export default {
    name: "App",
    components: {
      InsertModal
    },
    data() {
      return {
        isModalVisible: false,
      }
    },
    methods: {
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      }
    }
  }
</script>

<style>

html, body, #app {
  background: linear-gradient(0deg, #793df0, #150d3d);;
  color: black;
  margin: 0;
  padding: 0; 
  height: 100%;
  width: 100%;
}

#top {
  background-color: #150d3d;
  color: white;
  padding: 30px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

button {
  padding: 10px;
  font-weight: bold;
  margin-right: 100px;
}

</style>