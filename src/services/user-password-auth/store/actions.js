import { LocalStorage } from 'quasar'
import axios from 'axios'

const sanctum = '/sanctum/csrf-cookie'

function register({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axios
      .get(sanctum)
      .then(() => {
        axios
          .post('/api/register', payload)
          .then(() => {
            commit('setLoggedIn', true)

            axios
              .get('/api/user')
              .then((response) => {
                commit('setDetails', response.data.data)

                resolve()
                this.$router.replace({ name: 'home' })
              })
              .catch((error) => {
                commit('setLoggedIn', false)
                reject(error)
              })
          })
          .catch((error) => {
            reject(error)
          })
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function login({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axios
      .get(sanctum)
      .then(() => {
        axios
          .post('/api/login', payload)
          .then(() => {
            commit('setLoggedIn', true)

            axios
              .get('/api/user')
              .then((response) => {
                commit('setDetails', response.data.data)

                resolve()

                this.$router.replace({ name: 'home' })
              })
              .catch((error) => {
                commit('setLoggedIn', false)
                reject(error)
              })
          })
          .catch((error) => {
            reject(error)
          })
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function logout({ commit }) {
  const reset = () => {
    commit('setLoggedIn', false)
    this.$router.replace({ name: 'login' })
  }

  axios
    .post('/api/logout')
    .then(() => {
      reset()
    })
    .catch(() => {
      // showErrorNotification('Session expired!')
      reset()
    })
}

function getState({ commit }) {
  const loggedIn = LocalStorage.getItem('user.loggedIn') || false
  const details = LocalStorage.getItem('user.details') || {}

  commit('setLoggedIn', loggedIn)
  commit('setDetails', details)
}

export { register, login, logout, getState }
