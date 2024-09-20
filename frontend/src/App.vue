/* eslint-disable prettier/prettier */
<template>
  <div id="app">
    <div id="top">
      <h1 style="padding-left: 2rem; text-align: left">Juntos Energia</h1>

      <button 
      type="button" 
      @click="showModal"
      class="btn"
      >
      Inserir um Novo Produto
    </button>
    
    </div>

    <ProductList/>
    <InsertModal
      v-show="isModalVisible"
      @close="closeModal"
    />

  </div>
</template>

<script>
  import ProductList from './components/ProductList.vue';
  import InsertModal from './components/InsertModal.vue';

  export default {
    name: "App",
    components: {
      ProductList,
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
  padding: 10px;
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