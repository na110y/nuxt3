import {createStore} from 'vuex'
import axios from 'axios'

export const store = createStore({
    state: {
        listProduct: [],
        textRouter: 'Home',
        cart: [],
        selectedProduct: null

    },
    mutations: {
        SET_PRODUCT(state, listProduct) {
            state.listProduct = listProduct
        },

        SET_CART(state, product) {
            state.cart = product
        },

        SET_ROUTER_TEXT(state, text) {
            state.textRouter = text
        },

        SET_SELECTED_PRODUCT(state, product) {
            state.selectedProduct = product;
        },

        ADD_TO_CART(state, product) {
            state.cart.push(product);
        },

        REMOVE_CART(state, productId) {
            const index = state.cart.findIndex((item) => item.id === productId);
            if (index !== -1) {
                state.cart.splice(index, 1);
            }
        },
    },
    getters: {
        cartItems: (state) => {
            return state.cart.map((item) => {
                const product = state.listProduct.find((p) => p.id === item.id);
                return {...item, ...product};
            });
        },
    },
    actions: {
        // call api lấy toàn bộ sản phẩm
        async setProduct({commit}) {
            try {
                const response = await axios.get("https://fakestoreapi.com/products")
                commit('SET_PRODUCT', response.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        },

    }
})