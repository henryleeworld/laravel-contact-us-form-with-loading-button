import './bootstrap';
import Vue from 'vue';

/**
 * Next, we will create a fresh Vue application instance. You may then begin
 * registering components with the application instance so they are ready
 * to use in your application's views. An example is included for you.
 */

window.Vue = Vue;

import LoadingButtonForm from './components/LoadingButtonForm.vue';
import LoadingOverlayForm from './components/LoadingOverlayForm.vue';
Vue.component('loading-button-form', LoadingButtonForm);
Vue.component('loading-overlay-form', LoadingOverlayForm);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
const app = new Vue({
    el:'#app'
});