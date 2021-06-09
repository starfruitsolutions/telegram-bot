import Vue from 'vue'
import Vuex from 'vuex'

import { API, graphqlOperation } from 'aws-amplify'
import {
  listBots,
  getBot,
  getCommand
 } from '@/graphql/queries'
import {
  createBot,
  updateBot,
  deleteBot,
  createCommand,
  updateCommand,
  deleteCommand,
} from '@/graphql/mutations'
import {
  onCreateBot,
  onDeleteBot,
  onCreateCommand,
  onUpdateCommand,
  onDeleteCommand,
  onCreateSource,
  onUpdateSource,
  onDeleteSource
} from '@/graphql/subscriptions'

Vue.use(Vuex)

var subscriptions = {
  bots: {},
  commands: {},
  sources: {}
}

export default new Vuex.Store({
  state: {
    user: null,
    bots: [],
    bot: {},
    command: {}
  },
  getters: {
    user(state) {
      return state.user
    },
    bots(state) {
      return state.bots
    },
    bot(state) {
      return state.bot
    },
    command(state) {
      return state.command
    }
  },
  mutations: {
    setUser(state, val) {
      state.user = val
    },
    setBots(state, val) {
      // sort alphabetically
      state.bots = val.sort((a, b) => {
        if(a.name < b.name) { return -1 }
        if(a.name > b.name) { return 1 }
        return 0
      })
    },
    setBot(state, val) {
      // sort the Commands alphabetically
      val.commands = val.commands.items.sort((a, b) => {
        if(a.name < b.name) { return -1 }
        if(a.name > b.name) { return 1 }
        return 0
      })
      state.bot = val
    },
    setCommand(state, val) {
      if(val.sources){ // sometimes we don't have these yet
        // sort the sources alphabetically
        val.sources = val.sources.items.sort((a, b) => {
          if(a.name < b.name) { return -1 }
          if(a.name > b.name) { return 1 }
          return 0
        })
      }
      state.command = val
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
        next: () => dispatch('getBots'),
        error: error => console.warn(error)
      })
      subscriptions.bots.delete = API.graphql(
        graphqlOperation(onDeleteBot)
      ).subscribe({
        next: () => dispatch('getBots'),
        error: error => console.warn(error)
      })
    },
    unsubscribeBots() {
      subscriptions.bots.unsubscribe()
    },
    async createBot (_, val) {
      await API.graphql({
        query: createBot,
        variables: {input: val}
      })
    },
    async updateBot (_, val) {
      await API.graphql({
        query: updateBot,
        variables: {input: val}
      })
    },
    async deleteBot(_, id) {
      let confirmation = confirm('Are you sure you want to delete this?')
      if (confirmation) {
        await API.graphql({
          query: deleteBot,
          variables: {
            input: {id: id}
          }
        })
      }
    },
    async getBot({ commit }, id) {
      let response = await API.graphql({
        query: getBot,
        variables: { id: id }
      })
      commit('setBot', response.data.getBot)
    },
    subscribeCommands({ state, dispatch }) {
      subscriptions.commands.create = API.graphql(
        graphqlOperation(onCreateCommand)
      ).subscribe({
        next: () => dispatch('getBot', state.bot.id),
        error: error => console.warn(error)
      })
      subscriptions.commands.update = API.graphql(
        graphqlOperation(onUpdateCommand)
      ).subscribe({
        next: () => dispatch('getBot', state.bot.id),
        error: error => console.warn(error)
      })
      subscriptions.commands.delete = API.graphql(
        graphqlOperation(onDeleteCommand)
      ).subscribe({
        next: () => dispatch('getBot', state.bot.id),
        error: error => console.warn(error)
      })
    },
    unsubscribeCommands() {
      subscriptions.commands.unsubscribe()
    },
    async getCommand({ commit }, id) {
      let response = await API.graphql({
        query: getCommand,
        variables: { id: id }
      })
      commit('setCommand', response.data.getCommand)
    },
    async createCommand(_, val) {
      await API.graphql({
        query: createCommand,
        variables: {
          input: val
        }
      })
    },
    async updateCommand(_, val) {
      await API.graphql({
        query: updateCommand,
        variables: {
          input: val
        }
      })
    },
    async deleteCommand(_, id) {
      let confirmation = confirm('Are you sure you want to delete this?')
      if (confirmation) {
        await API.graphql({
          query: deleteCommand,
          variables: {
            input: {id: id}
          }
        })
      }
    },
    subscribeSources({ state, dispatch }) {
      subscriptions.sources.create = API.graphql(
        graphqlOperation(onCreateSource)
      ).subscribe({
        next: () => dispatch('getCommand', state.command.id),
        error: error => console.warn(error)
      })
      subscriptions.sources.update = API.graphql(
        graphqlOperation(onUpdateSource)
      ).subscribe({
        next: () => dispatch('getCommand', state.command.id),
        error: error => console.warn(error)
      })
      subscriptions.sources.delete = API.graphql(
        graphqlOperation(onDeleteSource)
      ).subscribe({
        next: () => dispatch('getCommand', state.command.id),
        error: error => console.warn(error)
      })
    },
  }
})
