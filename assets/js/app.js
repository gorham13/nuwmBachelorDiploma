
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('app', require('./components/App.vue'));
Vue.component('moisture-transfer', require('./components/MoistureTransfer.vue'));
Vue.component('moisture-transfer1', require('./components/MoistureTransfer1.vue'));
Vue.component('heat-transfer', require('./components/HeatTransfer.vue'));
Vue.component('heat-mass-transfer', require('./components/HeatMassTransfer.vue'));
Vue.component('mass-without-temp', require('./components/MassWithoutTemp.vue'));
Vue.component('moisture-without-temp', require('./components/MoistureWithoutTemp.vue'));


const app = new Vue({
    el: '#app'
});
