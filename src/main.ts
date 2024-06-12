import './assets/main.css';
import { createI18n } from 'vue-i18n';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import vClickOutside from 'click-outside-vue3';
import UUID from 'vue3-uuid';
import Notifications from '@kyvg/vue3-notification';

import en from '@/langs/en.json';
import uk from '@/langs/uk.json';

const i18n = createI18n({
  locale: 'uk',
  legacy: false,
  messages: {
    en,
    uk
  }
});
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(i18n);
app.use(createPinia());
app.use(router);
app.use(vClickOutside);
app.use(UUID);
app.use(Notifications);

app.mount('#app');
