import Vue from 'vue';
import template from './cart.html';
import './cart.scss';

import { postsResource } from 'src/util/resources';

export default Vue.extend({
  template,

  data() {
    return {

      posts: [],

      result: []
    }
  },
  props: ['items'],

  created(){
    this.fetchPosts();
  },

  computed: {
    total() {
      var total = 0;
      this.result.forEach(function(item, i) {
        total += item.price*item.count;
      });
      return total.toFixed(2);
    }
  },

  methods: {
    fetchPosts(){
      return postsResource.get('/')
        .then((response) => {
          this.posts = response.data;

          this.posts.forEach(function(item, i) {
            item.count = 0;
          });

          var result = [];
          var array = this.posts.slice();
          var items = this.items.slice();

          array.forEach(function(item, i) {
            items.forEach(function(item2, j) {
              if(item.id == item2.id) {
                result.push(item);
                result[result.length-1].count = item2.count;
              }
            });
          });

          this.result = result;
          console.log(this.result);

        })
        .catch((errorResponse) => {
          // Handle error...
          console.log('API responded with:', errorResponse);
        });
    }
  }

});
