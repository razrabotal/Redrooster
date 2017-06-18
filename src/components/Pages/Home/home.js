import Vue from 'vue';

import { postsResource } from 'src/util/resources';

import template from './home.html';
import './home.scss';

import Callout from 'src/components/BlocksMini/Callout/callout';
import CalloutFull from 'src/components/BlocksMini/CalloutFull/calloutfull';

import HeaderBase from 'src/components/Blocks/HeaderBase/headerBase';
import HeaderTop from 'src/components/Blocks/HeaderTop/headerTop';
import FooterBase from 'src/components/Blocks/FooterBase/footerBase';

import Item from 'src/components/Elements/Item/item';

export default Vue.extend({
  template,
  components: {
    HeaderBase,
    HeaderTop,
    Callout,
    CalloutFull,
    FooterBase,
    Item
  },
  data() {
    return {
      showModal: false
    }
  },
  props: ['cartitems']
});
