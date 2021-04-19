import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import InputBox from './components/InputBox.vue'

const app = createApp(App)
app.component('input-box', InputBox)
app.mount('#app')
