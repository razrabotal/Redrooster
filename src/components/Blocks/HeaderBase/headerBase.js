import Vue from 'vue';
import template from './headerBase.html';
import './headerBase.scss';

import Cart from 'components/Elements/Cart/cart';

export default Vue.extend({
  template,
  components: {
    Cart
  },

  created: function () {
    this.ready()
  },

  data() {
    return {
      toggle: false
    }
  },
  props: ['cartitems'],
  methods: {
    navtoggle: function() {
      this.toggle = !this.toggle;
    },
    ready: function () {
      setTimeout(function () {
        $(".nav-toggle").on("click", function() {
          $(this).parent().toggleClass("_open");
        });
        // Из центра в меню
        $('.services').clone().appendTo( $('.nav-list--services') );
        $('.search').clone().appendTo( $('.nav-list--search') );

        $(".nav ul ul").before("<span class='nav--subtoggle'><i class='arrowDown-icon'></i></span>");

        $(".nav--subtoggle").on("click", function() {
          $(this).parent().toggleClass("_open");
        });
      }, 5000);
     }
   },
});
