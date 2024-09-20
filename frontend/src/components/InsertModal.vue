<template>
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">

          <slot name="header">
            Inserir Produto
          </slot>

          <button
            type="button"
            class="btn-close"
            @click="close"
          >
            X
          </button>
        </header>
  
        <section class="modal-body">
            <form @submit.prevent="addProduct">

                <div class="form-group">
                    <label for="name">Nome do Produto</label>
                    <input
                    v-model="name"
                    type="text"
                    id="name"
                    required
                    />
                </div>

                <div class="form-group">
                    <label for="price">Preço</label>
                    <input
                    v-model.number="price"
                    type="number"
                    id="price"
                    required
                    min="1"
                    step="0.01"
                    />
                </div>

                <div class="form-group">
                    <label for="stock">Estoque</label>
                    <input
                    v-model.number="stock"
                    type="number"
                    id="stock"
                    required
                    min="0"
                    />
                </div>

                <button
                    class="btn-insert"
                    type="submit"
                >
                    Adicionar Produto
                </button>

            </form>
        </section>
      </div>
    </div>
  </template>

<script>
import { api } from '@/services/api.ts';

export default {
    name: "InsertModal",
    data() {
        return {
            name: "",
            price: 0,
            stock: 0,
        }
    },
    methods: {
        close() {
            this.$emit("close");
        },
        async addProduct() {
            try {
                const response = await api.post('/products', {
                    name: this.name,
                    price: this.price,
                    stock: this.stock
                })
                alert("Produto adicionado com sucesso!");

                this.$emit('product-added', response.data);
                this.close();
            } catch (error) {
                console.error("Erro ao adicionar Produto: ", error);
                alert("Erro ao adicionar Produto.")
            }
        }
    }
}
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 15px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header, .modal-footer {
    padding: 15px;
    display: flex;
    justify-content: space-between;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #150d3d;
    font-weight: bolder;
  }

  .modal-body {
    position: flex;
    padding: 2rem 5rem;
    color: black;
  }

  .form-group {
    padding-top: 20px;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    box-sizing: border-box;
  }

  form button {
    align-items: center;
    justify-items: center;
    margin-top: 15px;
  }

  .btn-close, .btn-insert {
    font-weight: bold;
  }  
</style>