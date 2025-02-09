import { createApp, h } from 'vue';
import { provideApolloClient } from "@vue/apollo-composable"; 
import apolloClient from './apollo-client'; 
import { createMetaManager } from 'vue-meta';
import './style.css';
import App from './App.vue';
import './index.css';
import { createPinia } from 'pinia';
import router from "../src/router";

const app = createApp({
  setup() {
    
    provideApolloClient(apolloClient);
  },
  render: () => h(App),
});

const pinia = createPinia();


const metaManager = createMetaManager();


app.use(router);
app.use(metaManager);
app.use(pinia);


app.mount('#app');
  






