import Vue from 'vue';

import { categoriesResource } from 'src/util/resources';

import template from './shopnav.html';
import './shopnav.scss';

export default Vue.extend({
  template,

  data() {
    return {
      category: {},
      categoriesFilter: '',
      categories: [],

      cat: {}
    };
  },

  computed: {
    filteredCategories() {
      return this.categories.filter((category) => category.title.toLowerCase().indexOf(this.categoriesFilter.toLowerCase()) !== -1);
    }
  },

  created(){
    this.fetchCategories();
    this.fetchCategory();
  },

  methods: {

    fetchCategories(){
      return categoriesResource.get('/')
        .then((response) => {
          this.categories = response.data;
        })
        .catch((errorResponse) => {
          // Handle error...
          console.log('API responded with:', errorResponse);
        });
    },

    fetchCategory(){
      const id = this.$route.params.id;

      return categoriesResource.get(`${id}`)
        .then((response) => {
          this.cat = response.data;
        })
        .catch((errorResponse) => {
          // Handle error...
          console.log('API responded with:', errorResponse);
        });
    },

    // Methods for transitions
    handleBeforeEnter(el) {
      el.style.opacity = 0;
      el.classList.add('animated');
    },

    handleEnter(el) {
      const delay = el.dataset.index * animationDelay;
      setTimeout(() => {
        el.style.opacity = 1;
        el.classList.add(animation);
      }, delay);
    }
  }
});
