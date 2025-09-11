import './css/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'

// for generating the pdf export
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const app = createApp(App)

app.config.globalProperties.$version = 'v2.3';
app.config.globalProperties.$jsPDF = jsPDF;

app.use(router)
app.mount('#app')
