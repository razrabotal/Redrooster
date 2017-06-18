import Vue from 'vue';

import { postsResource } from 'src/util/resources';
import { categoriesResource } from 'src/util/resources';
import { subcategoriesResource } from 'src/util/resources';

import template from './subscriptions.html';
import './subscriptions.scss';

import HeaderBase from 'src/components/Blocks/HeaderBase/headerBase';
import FooterBase from 'src/components/Blocks/FooterBase/footerBase';

import ShopNav from 'src/components/Elements/ShopNav/shopnav';
import CalloutFull from 'src/components/BlocksMini/CalloutFull/calloutfull';

export default Vue.extend({
  template,
  components: {
    HeaderBase,
    ShopNav,
    CalloutFull,
    FooterBase
  },

  data() {
    return {
      post: {},
      cat: {},
      subcat: {},

      categories: [],

      bags: '1 Bag',
      frequency: '2 Weeks',
      ground: 'Wholebean',
      prefer: {
        value:'Blends',
        price: 17
      }
    };
  },

  created(){
    this.fetchPost();
    this.fetchCategory();
    this.fetchSubCategory();
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

  methods: {
    fetchPost(){
      const id = this.$route.params.idp;

      return postsResource.get(`${id}`)
        .then((response) => {
          this.post = response.data;
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

    fetchSubCategory(){
      const idc = this.$route.params.idc;

      return subcategoriesResource.get(`${idc}`)
        .then((response) => {
          this.subcat = response.data;
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
