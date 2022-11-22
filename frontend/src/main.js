import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import store from './store'
import ProfileLinkButton from './components/ui/ProfileLinkButton.vue';

const app = createApp(App)
app.use(store)
app.use(router)
app.component('profile-link-button', ProfileLinkButton)

app.mount('#app');
