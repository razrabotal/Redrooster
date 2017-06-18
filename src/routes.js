import Home from 'src/components/Pages/Home/home';
import Product from 'components/Pages/Product/product';
import SubCategory from 'components/Pages/SubCategory/subcategory';
import Subscriptions from 'components/Pages/Subscriptions/subscriptions'

import NotFound from 'components/NotFound/notFound';



const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/shop/:id/:idc/:idp',
    name: 'post',
    component: Product
  },
  {
    path: '/shop/:id',
    name: 'category',
    component: SubCategory
  },
  {
    path: '/shop/:id/:idc',
    name: 'subcategory',
    component: SubCategory
  },
  {
    path: '/subscriptions',
    name: 'subscriptions',
    component: Subscriptions
  },
  {
    path: '*',
    component: NotFound
  }
];

export default routes;
