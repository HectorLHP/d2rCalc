import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify'; // Set up Vuetify
import 'vuetify/styles'; // Import Vuetify styles



const app = createApp(App);

// No need to register Vuetify components manually (VApp, VBtn, VContainer, etc.)
app.use(router);
app.use(vuetify);

app.mount('#app');
