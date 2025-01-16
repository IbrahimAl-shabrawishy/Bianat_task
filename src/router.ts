import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import All from "./components/All/All.vue";
import Mac from "./components/Mac/Mac.vue";
import Iphone from "./components/Iphone/Iphone.vue";
import Ipad from "./components/Ipad/Ipad.vue";
import Ipod from "./components/Ipod/Ipod.vue";
import Accessories from "./components/Accessories/Accessories.vue";
import NotFounded from "./components/NotFounded/NotFounded.vue";
import Layout from "./components/Layout/Layout.vue";

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
        path: '/mac', 
        component: Mac,
        meta: { title: 'Mac' },
      },
      { 
        path: '/iphone', 
        component: Iphone,
        meta: { title: 'iPhone' },
      },
      { 
        path: '/ipad', 
        component: Ipad,
        meta: { title: 'iPad' },
      },
      { 
        path: '/ipod', 
        component: Ipod,
        meta: { title: 'iPod' },
      },
      { 
        path: '/accessories', 
        component: Accessories,
        meta: { title: 'Accessories' },
      },
    ],
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
