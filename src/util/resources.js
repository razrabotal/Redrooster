import axios from 'axios';

import { API_BASE } from 'src/config/constants';

// Resources for /posts endpoint on API
// @see https://github.com/mzabriskie/axios#creating-an-instance
export const postsResource = axios.create({
  baseURL: `${API_BASE}/posts`
});

export const categoriesResource = axios.create({
  baseURL: `${API_BASE}/categories`
});

export const subcategoriesResource = axios.create({
  baseURL: `${API_BASE}/subcategories`
});
