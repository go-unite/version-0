import { createApp } from './Vue'
import App from '../src/App.vue'
import router from '../src/router/router.js'


const app = createApp(App)

app.use(router)

app.mount('#app')