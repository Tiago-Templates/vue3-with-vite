import { createApp } from 'vue';
import './assets/main.css';
import App from './App.vue';
// import TimeCalculator from './components/TimeCalculator.vue';

const app = createApp(App);

// app.component('TimeCalculator', TimeCalculator);

app.mount('#app');
