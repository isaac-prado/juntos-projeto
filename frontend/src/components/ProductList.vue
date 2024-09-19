*/ eslint-disable prettier/prettier /*
<template>
    <div>
      <h2>Lista de Produtos</h2>
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
    mounted() {
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

  <style>
    h2 {
      text-align: center;
      font-size: xx-large;
    }

    ul {
      text-align: center;
      list-style-type: none;
    }
  </style>
