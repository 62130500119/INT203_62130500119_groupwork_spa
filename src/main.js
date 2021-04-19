import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import InputBox from './components/InputBox.vue'
import router from './router'

const app = createApp(App).use(router).use(router)
app.component('input-box', InputBox)
app.mount('#app')
