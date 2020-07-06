import Vue from 'vue';
import App from './App.vue';

import A from './widgets/A.vue';
import C from './widgets/C.vue';
import B from './widgets/B.vue';
import Footer from './widgets/Footer.vue';
import Header from './widgets/Header.vue';
import Capacity from './widgets/Capacity.vue';
import Default from './widgets/Default.vue';

Vue.config.productionTip = false;

Vue.component('A', A);
Vue.component('B', B);
Vue.component('C', C);
Vue.component('Footer', Footer);
Vue.component('Header', Header);
Vue.component('Capacity', Capacity);
Vue.component('Default', Default);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
