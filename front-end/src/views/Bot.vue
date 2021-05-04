<template>
  <div v-if="bot">
    <v-btn to="/">Back</v-btn>
    <h1>Bot: {{ bot.name }} </h1>
    <h4 class="mb-5">ID: {{ bot.id }}</h4>
    <bot :bot="bot"/>
    <h2 class="my-5">Commands</h2>
    <v-btn @click="addVisible = !addVisible"> Add command</v-btn>
    <command v-if="addVisible" :bot="bot"/>
    <v-expansion-panels accordion>
      <v-expansion-panel
        v-for="command in bot.commands.items"
        :key="command.id"
      >
        <v-expansion-panel-header><h3>{{ command.name }}</h3></v-expansion-panel-header>
        <v-expansion-panel-content>
          <command :command="command"/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
  import { API, graphqlOperation } from 'aws-amplify'
  import {onUpdateBot} from '@/graphql/subscriptions'
  import { getBot } from '@/graphql/queries'

  import bot from "@/components/forms/Bot"
  import command from "@/components/forms/Command"

  export default {
    name: 'Home',
    data () {
      return {
        bot: null,
        commands: [],
        addVisible: false
      }
    },
    components: {
      'bot': bot,
      'command': command,

    },
    methods: {
      async getBot(id) {
        const bot = await API.graphql({
          query: getBot,
          variables: { id: id }
        })
        this.bot = bot.data.getBot

      },
    },
    async created() {
      this.getBot(this.$route.params.id)
      this.subscription = API.graphql(
        graphqlOperation(onUpdateBot)
      ).subscribe({
        next: () => this.getBot(),
        error: error => console.warn(error)
      })
    },
  }

</script>
