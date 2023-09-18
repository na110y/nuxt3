import {createStore} from 'vuex'
import axios from 'axios'

export const store = createStore({
    state: {
        listProduct: [],
        textRouter: 'Home',
        cart: [],
        selectedProduct: null,
        toastMessage: null,

    },
    mutations: {
        // lấy ra danh sách sản phẩm
        SET_PRODUCT(state, listProduct) {
            state.listProduct = listProduct
        },


        SET_CART(state, product) {
            state.cart = product
        },

        // lấy ra giá trị txt của router
        SET_ROUTER_TEXT(state, text) {
            state.textRouter = text
        },

        SET_SELECTED_PRODUCT(state, product) {
            state.selectedProduct = product;
        },

        // thêm sản phẩm vào giỏ hàng
        ADD_TO_CART(state, product) {
            state.cart.push(product);
        },

        // xóa sản phẩm ở giỏ hàng
        REMOVE_FROM_CART(state, productId) {
            const index = state.cart.findIndex(item => item._rawValue.id === productId);
            if (index !== -1) {
                state.cart.splice(index, 1);
            }
        },

        // khởi tạo toast message
        SET_TOAST_MESSAGE(state, message) {
            state.toastMessage = message
        },

        // tắt toast message
        CLEAR_TOAST_MESSAGE(state) {
            state.toastMessage = null
        },


    },
    getters: {
        // lấy ra danh sách sản phẩm khi đã thêm vào giỏ hàng
        cartItems: (state) => {
            return state.cart.map((item) => {
                const product = state.listProduct.find((p) => p.id === item.id);
                return {...item, ...product};
            });
        },

        toastMessage: (state) => state.toastMessage,
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

        // toast message tự động tắt trong 5s
        showSuccessToast({commit}, message) {
            commit('SET_TOAST_MESSAGE', message)
            setTimeout(() => {
                commit('CLEAR_TOAST_MESSAGE')
            }, 5000)
        },


    }
})
