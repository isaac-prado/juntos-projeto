*/ eslint-disable prettier/prettier /*
<template>
  <div class="super">
    <div class="product-table-container">
      <table class="product-table">
        <thead>
          <tr>
            <th>NOME</th>
            <th>PREÇO</th>
            <th>ESTOQUE</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.stock }}</td>
          </tr>
        </tbody>

      </table>
    </div>
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

<style scoped>
  .super {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }

  .product-table-container {
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 90%;
  }

  .product-table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
    margin: auto;
  }

  .product-table thead {
    background-color: #793df0;
    color: white;
    text-transform: uppercase;
  }

  .product-table th, .product-table td {
    padding: 12px 15px;
    border-bottom: 1px solid #ddd;
  }

  .product-table tbody tr:hover {
    background-color: #dadada;
    cursor: pointer;
  }

  .product-table th {
    font-weight: 700;
    font-size: 20px;
  }

  .product-table td {
    font-size: 16px;
  }
</style>
