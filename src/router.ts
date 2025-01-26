import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import All from "./components/All/All.vue";
import Clothes from "./components/Clothes/Clothes.vue";
import Electronics from "./components/Electronics/Electronics.vue";
import Change from "./components/ChangeTitle/Change.vue";
import Shoes from "./components/Shoes/Shoes.vue";
import Miscellaneous from "./components/Miscellaneous/Miscellaneous.vue";
import NotFounded from "./components/NotFounded/NotFounded.vue";
import Layout from "./components/Layout/Layout.vue";
import ProductDetails from "./components/ProductDetails/ProductDetails.vue";
import Home from "./components/Home/Home.vue";
import Cart from "./components/Cart/Cart.vue";

const routes: RouteRecordRaw[] = [ 
  {
    path: '/',
    component: Layout,
    children: [
      { 
        path: '/all', 
        component: All,
        meta: { title: 'All',
            
         },
      },
      { 
        path: '/clothes', 
        component: Clothes,
        meta: { title: 'Clothes' },
      },
      { 
        path: '/electronics', 
        component: Electronics,
        meta: { title: 'Electronics' },
      },
      { 
        path: '/change', 
        component: Change,
        meta: { title: 'Change Title' },
      },
      { 
        path: '/shoes', 
        component: Shoes,
        meta: { title: 'Shoes' },
      },
      { 
        path: '/miscellaneous', 
        component: Miscellaneous,
        meta: { title: 'Miscellaneous' },
      },
     
    ],
    
    
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',  
    component: ProductDetails,
    props: true
  }
  
,{
  path:'/home',
  component:Home,
  meta:{title:'Home '}
    },
    {
       path:"/cart",
       component:Cart,
       meta:{title:"Cart"}
    },
 
  {
    path: "/:pathMatch(.*)*", 
    component: NotFounded,
    meta: { title: 'Page Not Found' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// هنا تضيف الكود لضبط العنوان
router.beforeEach((to, from, next) => {
  const metaTitle = to.meta.title || 'Default Title'; // إذا لم يكن هناك title، استخدم "Default Title"
  document.title = metaTitle as string;
  next();
});

export default router;
