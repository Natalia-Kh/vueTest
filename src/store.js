import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        orders: [],
        emailCl: "",

    },
    mutations: {
        addNew(state, { prod, nextId }) {
            state.orders.push({
                orderNumder: nextId,
                productName: prod.productName,
                count: 1,
                sum: prod.sum,
                total: prod.sum,
            })
        },
        delProd(state, { prod }) {
            let ord = state.orders.findIndex(
                (order) => order.productName === prod.productName
            );
            state.orders.splice(ord, 1);
        },
        addone(state, { prod }) {
            let ord = state.orders.find(
                (order) => order.productName === prod.productName
            );
            ord.count += 1;
            ord.total = prod.sum * ord.count;
        },
        addEmail(state, { emailCl }) {
            state.emailCl = emailCl
        },
        inpCount(state, { currentCount, index }) {
            let order = state.orders[index];
            order.total = currentCount * order.sum;
        },
    }
})
export default store;