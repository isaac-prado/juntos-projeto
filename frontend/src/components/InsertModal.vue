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
  
        <section>
            <form class="modal-body" @submit.prevent="addProduct">
                <div class="modal-item">
                    <label for="name">Nome do Produto</label>
                    <input
                    v-model="name"
                    type="text"
                    id="name"
                    required
                    />
                </div>

                <div class="modal-item">
                    <label for="price">Preço</label>
                    <input
                    v-model.number="price"
                    type="number"
                    id="price"
                    required
                    min="0.01"
                    step="0.01"
                    />
                </div>

                <div class="modal-item">
                    <label for="stock">Estoque</label>
                    <input
                    v-model.number="stock"
                    type="number"
                    id="stock"
                    required
                    min="1"
                    step="1"
                    />
                </div>

                <button
                    class="modal-item"
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
                alert("Produto adicionado com sucesso!\nAtualize a Página.");

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
    border-radius: 8px;
  }

  .modal-header {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #150d3d;
    font-weight: bolder;
  }

  .modal-body {
    position: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 3rem;
    color: black;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    box-sizing: border-box;
  }

  .modal-item {
    margin-bottom: 30px;
  }

  .btn-close {
    padding: 4px;
  }

</style>