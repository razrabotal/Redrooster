import Vue from 'vue';

import { categoriesResource } from 'src/util/resources';
import { subcategoriesResource } from 'src/util/resources';
import { postsResource } from 'src/util/resources';

import template from './subcategory.html';
import './subcategory.scss';

import HeaderBase from 'src/components/Blocks/HeaderBase/headerBase';
import FooterBase from 'src/components/Blocks/FooterBase/footerBase';

import ShopNav from 'src/components/Elements/ShopNav/shopnav';
import Item from 'src/components/Elements/Item/item';

import CalloutFull from 'src/components/BlocksMini/CalloutFull/calloutfull';


export default Vue.extend({
  template,
  components: {
    ShopNav,
    HeaderBase,
    Item,
    CalloutFull,
    FooterBase
  },

  data() {
    return {
      category: {},
      categoriesFilter: '',
      categories: [],

      subcategory: {},
      subcategoriesFilter: '',
      subcategories: [],

      cat: {},
      subcat: {}
    };
  },

  props: ['cartitems'],
  
  computed: {
    filteredCategories() {
      return this.categories.filter((category) => category.title.toLowerCase().indexOf(this.categoriesFilter.toLowerCase()) !== -1);
    },
    filteredSubCategories() {
      if(!this.$route.params.idc) {
        this.subcat.title = "All " + this.cat.description;
      }
      return this.subcategories.filter((subcategory) => (subcategory.title.toLowerCase().indexOf(this.subcategoriesFilter.toLowerCase()) !== -1) && (subcategory.catid == this.$route.params.id));
    }
  },

  created(){
    this.fetchCategory();
    this.fetchCategories();
    this.fetchSubCategories();
    this.fetchSubCategory();
  },

  methods: {

    reboot() {
      this.fetchCategory();
      this.fetchCategories();
      this.fetchSubCategories();
      this.fetchSubCategory();
      this.subcat.title = "All " + this.cat.description;
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

    fetchSubCategory(){
      const id = this.$route.params.idc;

      return subcategoriesResource.get(`${id}`)
        .then((response) => {
          this.subcat = response.data;
        })
        .catch((errorResponse) => {
          // Handle error...
          console.log('API responded with:', errorResponse);
        });
    },

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

    fetchSubCategories(){
      return subcategoriesResource.get('/')
        .then((response) => {
          this.subcategories = response.data;
        })
        .catch((errorResponse) => {
          // Handle error...
          console.log('API responded with:', errorResponse);
        });
    }
  }
});
