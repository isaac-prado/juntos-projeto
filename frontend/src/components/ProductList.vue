*/ eslint-disable prettier/prettier /*
<template>
    <div>
      <h1>Lista de Produtos</h1>
      <ul>
        <li v-for="product in products" :key="product._id">
          Produto:{{ product.name }} - ${{ product.price }} - Estoque:{{ product.stock }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { api } from '@/services/api.ts';
  
  export default {
    name: "ProductList",
    data() {
      return {
        products: []
      };
    },
    created() {
      this.fetchProducts();
    },
    methods: {
      async fetchProducts() {
        try {
          const response = await api.get("/products");
          console.log("Dados recebidos: ", response.data)
          this.products = response.data.products;
        } catch (error) {
          console.error("Erro ao buscar produtos:", error);
        }
      }
    }
  };
  </script>
