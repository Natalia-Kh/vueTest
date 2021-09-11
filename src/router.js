import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)
import indexpage from "./pages/index.vue";
import logpage from "./pages/log.vue";
import historypage from "./pages/history.vue";
import listpage from "./pages/list.vue";

const routes = [
    { path: '/', component: listpage },
    { path: '/index', component: indexpage },
    { path: '/log', component: logpage },
    { path: '/history', component: historypage },
]
export default new VueRouter({
    routes
})