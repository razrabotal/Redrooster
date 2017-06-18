import Vue from 'vue';

import { postsResource } from 'src/util/resources';
import { categoriesResource } from 'src/util/resources';
import { subcategoriesResource } from 'src/util/resources';

import template from './product.html';
import './product.scss';

import HeaderBase from 'src/components/Blocks/HeaderBase/headerBase';
import FooterBase from 'src/components/Blocks/FooterBase/footerBase';

import ShopNav from 'src/components/Elements/ShopNav/shopnav';
import Item from 'src/components/Elements/Item/item';

import CalloutFull from 'src/components/BlocksMini/CalloutFull/calloutfull';

export default Vue.extend({
  template,
  components: {
    HeaderBase,
    ShopNav,
    Item,
    CalloutFull,
    FooterBase
  },

  data() {
    return {
      post: {},
      cat: {},
      subcat: {},

      subcategories: [],

      count: 1,
      currentVariant: 'default'
    };
  },

  props: ['cartitems'],

  created(){
    this.fetchPost();
    this.fetchCategory();
    this.fetchSubCategory();

    this.fetchSubCategories();

    if(this.$route.params.idc == 0) {
      this.subcat.title = "All ";
    }

    window.scrollTo(0,0);

  },

  computed: {
    currentPrice() {
      if(this.post.variables) {
        return this.post.variables.filter((item) => item.label == this.currentVariant)[0].price;
      }
      else {
        return this.post.price;
      }
    },
    subcatFilter() {
      return this.subcategories.filter((category) => this.post.subcategoryId.includes(category.id));
    },
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
    reboot() {
      this.fetchPost();
      window.scrollTo(0,0);
      this.count = 1;
    },

    fetchPost(){
      const id = this.$route.params.idp;

      return postsResource.get(`${id}`)
        .then((response) => {
          this.post = response.data;

          if(this.post.variables) {
            this.currentVariant = this.post.variables[0].label;
          }

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
