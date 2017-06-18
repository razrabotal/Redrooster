import { setLoading } from 'src/util/helpers';
import { postsResource } from 'src/util/resources';

import { categoriesResource } from 'src/util/resources';
import { subcategoriesResource } from 'src/util/resources';

// Request interceptor
postsResource.interceptors.request.use((config) => {
  setLoading(true);
  return config;
}, (error) => {
  setLoading(false);
  console.log('RequestError: ', error);
  // Do something with request error
  return Promise.reject(error);
});

// Response interceptor
postsResource.interceptors.response.use((response) => {
  setLoading(false);
  return response;
}, (error) => {
  setLoading(false);
  console.log('ResponseError: ', error);
  // Do something with response error
  return Promise.reject(error);
});





// Request interceptor
categoriesResource.interceptors.request.use((config) => {
  setLoading(true);
  return config;
}, (error) => {
  setLoading(false);
  console.log('RequestError: ', error);
  // Do something with request error
  return Promise.reject(error);
});

// Response interceptor
categoriesResource.interceptors.response.use((response) => {
  setLoading(false);
  return response;
}, (error) => {
  setLoading(false);
  console.log('ResponseError: ', error);
  // Do something with response error
  return Promise.reject(error);
});



// Request interceptor
subcategoriesResource.interceptors.request.use((config) => {
  setLoading(true);
  return config;
}, (error) => {
  setLoading(false);
  console.log('RequestError: ', error);
  // Do something with request error
  return Promise.reject(error);
});

// Response interceptor
subcategoriesResource.interceptors.response.use((response) => {
  setLoading(false);
  return response;
}, (error) => {
  setLoading(false);
  console.log('ResponseError: ', error);
  // Do something with response error
  return Promise.reject(error);
});
