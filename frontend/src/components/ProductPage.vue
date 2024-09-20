<template>
    <div class="product-details">
      <h2>Detalhes do Produto: </h2>

      <div v-if="loading">Carregando dados do Produto...</div>

      <form v-else  @submit.prevent="updateProduct">

        <div class="form-item">
          <label for="name">Nome: </label>
          <input 
          v-model="product.name" 
          type="text" 
          id="name" 
          required>
        </div>

        <div class="form-item">
          <label for="price">Preço:</label>
          <input 
          v-model.number="product.price" 
          type="float" 
          id="price" 
          required>
        </div>

        <div class="form-item">
          <label for="stock">Estoque:</label>
          <input 
          v-model.number="product.stock" 
          type="number" 
          id="stock" 
          required>
        </div>

        <button type="submit">Atualizar Produto</button>
        <button type="button" @click="deleteProduct">Deletar Produto</button>

      </form>
    </div>
  </template>
  
  <script>
  import { api } from "@/services/api.ts";
  
  export default {
    props: ["_id"],
    data() {
      return {
        product: {
          name: "",
          price: 0,
          stock: 0
        }
      };
    },
    methods: {
      async fetchProduct() {
        try {
          const response = await api.get(`/products/${this._id}`);
          this.product = response.data;
        } catch (error) {
          console.error("Erro ao buscar o produto:", error);
        }
      },
      async updateProduct() {
        try {
          await api.put(`/products/${this._id}`, this.product);
          alert("Produto atualizado com sucesso!");
          this.$router.push("/products");
        } catch (error) {
          console.error("Erro ao atualizar o produto:", error);
          alert("Erro ao atualizar o produto.");
        }
      },
      async deleteProduct() {
        try {
          await api.delete(`/products/${this._id}`);
          alert("Produto deletado com sucesso!");
          this.$router.push("/products");
        } catch (error) {
          console.error("Erro ao deletar o produto:", error);
          alert("Erro ao deletar o produto.");
        }
      }
    },
    mounted() {
      this.fetchProduct();
    }
  };
  </script>
  
  <style scoped>
  .product-details {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .form-item {
    margin-bottom: 15px;
  }
  
  .form-item label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-item input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  </style>
  