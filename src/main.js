import Vue from 'vue';
import VueRouter from 'vue-router';

import { LoadingState } from 'src/config/loading-state';
import Loader from 'components/Loader/loader';

import Cart from 'components/Elements/Cart/cart';

Vue.use(VueRouter);

import 'src/config/http';
import routes from 'src/routes';
import 'src/style.scss';

export const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
});

new Vue({
  router,
  components: {
    Loader,
    Cart
  },

  data(){
    return {
      isLoading: false,
      showModal: false,
      items: [],
      count: 0
    };
  },

  created(){
    LoadingState.$on('toggle', (isLoading) => {
      this.isLoading = isLoading;
    });
    window.scrollTo(0,0);
  },

  methods: {
    addd(info) {
      var flag = true;

      this.items.forEach(function(item, i, arr) {
        if(item.id == info[0]) {
          item.count += +info[1];
          flag = false;
        }
      });

      if(flag) {
        this.items.push({id: +info[0], count: +info[1]});
      }

      this.showModal = true;
    }
  }


}).$mount('#app');
