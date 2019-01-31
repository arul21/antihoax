import Vue from 'vue'
import Vuex from 'vuex'
import VuexI18n from 'vuex-i18n' // load vuex i18n module
import app from './modules/app'
import axios from 'axios'
import swal from 'sweetalert';
import VueEvents from 'vue-events'

Vue.use(VueEvents)

import * as getters from './getters'
const baseUrl = `http://localhost:3000`
Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true, // process.env.NODE_ENV !== 'production',
  getters,
  modules: {
    app,
  },
  state: {
    user: {},
		status: '',
    token: localStorage.getItem('token') || '',
    data: [],
    categories: []
  },
  mutations: {
    auth_success(state, token, user){
			state.status = 'success'
			state.token = token
			state.user = user
    },
    auth_request(state){
      state.status = 'loading'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
    urldata(state, payload){
      state.data = payload
    },
    categoryList(state, payload){
      state.categories = payload
    }
  },
  actions:{
    doLogin({commit}, payload){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({
          url: baseUrl + `/users/signin`,
          method: `POST`,
          data: {
            userName: payload.userName,
            password: payload.password
          }
        })
        .then(response =>{
          const token = response.data.token
          const user = response.data.userName
          console.log(user, token);
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token, user)
          resolve(response)
          window.location ='/'
        })
        .catch(err =>{
          console.log(err);
        })
      })
    },

    logout({commit}){
			return new Promise((resolve, reject) => {
				commit('logout')
				localStorage.removeItem('token')
				delete axios.defaults.headers.common['Authorization']
        resolve()
        window.location = '/auth/login'
		  })
    },
    
    getData({commit}, payload){
      axios({
        url: baseUrl+`/report`,
        method: `GET`,
      })
      .then(response =>{
        commit('urldata', response.data)
      })
      .catch(err =>{
        console.log(err);
        
      })
    },

    updateCategory({commit, dispatch}, payload){
      axios({
        url: baseUrl+ `/category/${payload._id}`,
        method: `PUT`,
        data: {
          category: payload.category
        }
      })
      .then(response =>{
        console.log(`ok update`);
      })
      .catch(err =>{
        console.log(err)
      })
    },

    addCategory({commit, dispatch}, payload){
      axios({
        url: baseUrl+ `/category`,
        method: `POST`,
        data: {
          category: payload.category
        }
      })
      .then(response =>{
        
      })
      .catch(err =>{
        console.log(err);
      })
    },

    getAllCategory({commit}, payload){
      axios({
        url: baseUrl + `/category`,
        method: `GET`,
      })
      .then(response =>{
        commit('categoryList', response.data.data)
      })
      .catch(err =>{
        console.log(err);
      })
    },

    saveReport({commit, dispatch}, payload){
      console.log(`store`, payload._id);
      axios({
        url: baseUrl+ `/report/${payload._id}`,
        method: `PATCH`,
        data: {
          category: payload.category
        }
      })
      .then(response =>{
        // console.log(response);
      })
      .catch(err =>{
        console.log(err);
      })
    },

  }
})

Vue.use(VuexI18n.plugin, store)

export default store
