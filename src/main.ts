import { createApp , h, provide } from 'vue';
import { ApolloClients } from '@vue/apollo-composable';
import apolloClient from './apollo-client';
import  {createMetaManager } from 'vue-meta';
import './style.css'; // تأكد من أن هذا السطر موجود
import App from './App.vue';
import './index.css';

import router from "../src/router";


const app = createApp({
  setup() {
    // تعريف Apollo Client داخل التطبيق
    provide(ApolloClients, {
      default: apolloClient,
    });
  },
  render: () => h(App),
});

// إنشاء وإعداد MetaManager
const metaManager = createMetaManager(); 

// استخدام كل من الروتر و metaManager
app.use(router);
app.use(metaManager); 

// تثبيت التطبيق في العنصر #app
app.mount('#app');
