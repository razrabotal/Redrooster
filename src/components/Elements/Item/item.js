import Vue from 'vue';

import { postsResource } from 'src/util/resources';

import template from './item.html';
import './item.scss';

export default Vue.extend({
  template,

  data() {
    return {
      post: {},
      postsFilter: '',
      posts: [],

      id: 0,
      idc: 0
    };
  },

  props: ['sale', 'maxindex', 'category'],

  computed: {
    filteredPosts() {
      const id = +this.$route.params.id || +this.category || 0;
      const idc = +this.$route.params.idc || 0;

      this.posts = this.posts.filter((post, i) => post.title !== 'yo');

      // Копируем массив, чтобы данные не потерялись
      var array = this.posts.slice();

      array = array.filter((post, i) =>
        (((post.categoryId.includes(id) || id === 0) && (post.subcategoryId.includes(+idc) || idc === 0)) || post.title === 'yo')
        );

      if(this.sale) {
        array.splice(2, 0, {'title': 'yo'});
      }

      array.splice( this.maxindex, array.length);

      return array;
    }
  },

  created(){
    this.fetchPosts();

    this.id = this.$route.params.id || 0;
    this.idc = this.$route.params.idc || 0;
  },

  methods: {
    fetchPosts(){
      return postsResource.get('/')
        .then((response) => {
          this.posts = response.data;

          if(this.sale) {
            this.posts.splice(3, 0, {'title': 'yo'});
          }
        })
        .catch((errorResponse) => {
          // Handle error...
          console.log('API responded with:', errorResponse);
        });
    }
  }
});
