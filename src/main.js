import Vue from 'vue';
import App from './App.vue';

import Default from './widgets/Default.vue';
import Footer from './widgets/Footer.vue';
import Header from './widgets/Header.vue';
import Capacity from './widgets/Capacity.vue';
import Flow from './widgets/Flow.vue';
import Opening from './widgets/Opening.vue';

Vue.config.productionTip = false;

Vue.component('Default', Default);
Vue.component('Footer', Footer);
Vue.component('Header', Header);
Vue.component('Capacity', Capacity);
Vue.component('Flow', Flow);
Vue.component('Opening', Opening);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
