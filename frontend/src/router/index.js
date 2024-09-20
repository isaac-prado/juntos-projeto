import ProductList from '@/components/ProductList.vue';
import ProductPage from '@/components/ProductPage.vue';
import { createWebHistory } from 'vue-router';
import { createRouter } from 'vue-router';

const routes = [
    {
      path: '/products',
      name: 'ProductList',
      component: ProductList
    },
    {
      path: '/products/:_id',
      name: 'ProductPage',
      component: ProductPage,
      props: true
    }
  ];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;