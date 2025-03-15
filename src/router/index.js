import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductDetail from '../views/ProductDetail.vue';
import Cart from '../views/CartView.vue';
import LoginView from '@/views/LoginView.vue';
import PorductManagementView from '@/views/admin/PorductManagementView.vue';
import CategoryManagementView from '@/views/admin/CategoryManagementView.vue';
import RegisterView from '@/views/RegisterView.vue';
import PaymentView from '@/views/PaymentView.vue';
import OrdersView from '@/views/order/OrdersView.vue';
import OrderDetailsView from '@/views/order/OrderDetailsView.vue';
import AdminDashboardView from '@/views/admin/AdminDashboardView.vue';
import ProfileView from '@/views/ProfileView.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path:'/product/:id', component: ProductDetail, name: 'ProductDetail'
    },
    { 
      path: '/cart', component: Cart, name: 'Cart' 
    },
    {
      path:'/login', component: LoginView, name:'login'
    },
    {
      path:'/productmanagement', component: PorductManagementView, name:'productmanagement'
    },
    {
      path:'/categorymanagement', component: CategoryManagementView, name:'categorymanagement'
    },
    {
      path: '/register', component: RegisterView, name: 'register'
    },
    {
      path:'/payment', component: PaymentView, name:'payment'
    },
    {
      path:'/orders', component: OrdersView, name:'customeroders'
    },
    {
      path:'/ordermanagement', component: OrdersView, name:'ordermanagement'
    },
    {
      path: '/orderdetails/:orderId', component: OrderDetailsView, name:'orderdetails'
    },
    {
     path:'/admin', component: AdminDashboardView, name:'admindashboard' 
    },
    {
      path:'/profile', component: ProfileView, naem:'profile'
    }
  ],
})

export default router
