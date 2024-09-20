*/ eslint-disable prettier/prettier /*
<template>
  <div class="super">
    <div class="product-table-container">

      <div class="search">
        <input 
        type="text"
          v-model="filterName"
          @input="fetchProducts"
          placeholder="Buscar Produto"       
        />
      </div>

      <table class="product-table">
        <thead>
          <tr>
            <th>NOME</th>
            <th>PREÇO</th>
            <th>ESTOQUE</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="product in products" :key="product._id">
            <td><router-link :to="`/products/${product._id}`">{{ product.name }}</router-link></td>
            <td><router-link :to="`/products/${product._id}`">R${{ product.price }}</router-link></td>
            <td><router-link :to="`/products/${product._id}`">{{ product.stock }}</router-link></td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button @click="prevPage" :disabled="page <= 1">Anterior</button>
        <span>Página {{ page }} de {{ totalPages }}</span>
        <button @click="nextPage" :disabled="page >= totalPages">Próxima</button>
      </div>

    </div>
  </div>
</template>
  
  <script>
  import { api } from "@/services/api.ts";
  
  export default {
    name: "ProductList",
    data() {
      return {
        products: [],
        page: 1,
        limit: 10,
        totalProducts: 0,
        filterName: ""
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.totalProducts / this.limit);
      }
    },
    methods: {
      async fetchProducts() {
        try {
          const response = await api.get("/products", {
            params: {
              page: this.page,
              limit: this.limit,
              name: this.filterName
            }
          });
          this.products = response.data.products;
          this.totalProducts = response.data.meta.total;
          console.log("Dados recebidos: ", response.data)
        } catch (error) {
          console.error("Erro ao buscar produtos:", error);
        }
      },
      nextPage() {
        if (this.page < this.totalPages) {
          this.page += 1;
          this.fetchProducts();
        }
      },
      prevPage() {
        if (this.page > 1) {
          this.page -= 1;
          this.fetchProducts();
        }
      }
    },
    mounted() {
      this.fetchProducts();
    },
  };
  </script>

<style scoped>
  .super {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    text-align: center
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

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pagination button {
    margin-inline: 0;
  }

  .pagination span {
    margin: 20px;
  }

  .search {
    margin-block: 10px;
    margin-inline: 10px;
  }
</style>
