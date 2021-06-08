import Vue from 'vue'
import Vuex from 'vuex'

import { API, graphqlOperation } from 'aws-amplify'
import { listBots } from '@/graphql/queries'
import { createBot, updateBot, deleteBot } from '@/graphql/mutations'
import {onCreateBot, onDeleteBot} from '@/graphql/subscriptions'

Vue.use(Vuex)

var subscriptions = {
  bots: {},
  commands: {},
  sources: {}
}

export default new Vuex.Store({
  state: {
    user: null,
    bots: []
  },
  getters: {
    user(state) {
      return state.user
    },
    bots(state) {
      return state.bots
    }
  },
  mutations: {
    setUser(state, val) {
      state.user = val
    },
    setBots(state, val) {
      state.bots = val
    }
  },
  actions: {
    async getBots({ commit }) {
      let response = await API.graphql({
        query: listBots
      })
      commit('setBots', response.data.listBots.items)
    },
    subscribeBots({ dispatch }) {
      subscriptions.bots.create = API.graphql(
        graphqlOperation(onCreateBot)
      ).subscribe({
        next: () => {
          dispatch('getBots')
        },
        error: error => console.warn(error)
      })
      subscriptions.bots.delete = API.graphql(
        graphqlOperation(onDeleteBot)
      ).subscribe({
        next: () => {
          dispatch('getBots')
        },
        error: error => console.warn(error)
      })
    },
    unsubscribeBots() {
      subscriptions.bots.unsubscribe()
    },
    async createBot ({ dispatch }, val) {
      await API.graphql({
        query: createBot,
        variables: {input: val}
      })
      dispatch('getBots')
    },
    async update ({ dispatch }, val) {
      await API.graphql({
        query: updateBot,
        variables: {input: val}
      })
      dispatch('getBots')
    },
    async deleteBot({dispatch}, id) {
      let confirmation = confirm('Are you sure you want to delete this?')
      if (confirmation) {
        await API.graphql({
          query: deleteBot,
          variables: {
            input: {id: id}
          }
        })
        dispatch('getBots')
      }
    },
  }
})
