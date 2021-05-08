<template>
  <div v-if="bot">
    <v-btn to="/" class="my-5">Go Back To Bots</v-btn>
    <h1>Bot: {{ bot.name }} </h1>
    <h4 class="mb-5">ID: {{ bot.id }}</h4>
    <bot :bot="bot" class="mb-15"/>
    <h1>Commands</h1>
    <command :bot="bot" class="pa-5"/>
    <v-expansion-panels accordion>
      <v-expansion-panel
        v-for="command in bot.commands.items"
        :key="command.id"
      >
        <v-expansion-panel-header>
          <h3>{{ command.name }}</h3>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <command :command="command"/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-btn to="/" class="my-5">Go Back To Bots</v-btn>
  </div>
</template>

<script>
  import { API, graphqlOperation } from 'aws-amplify'
  import {onCreateCommand, onUpdateCommand, onDeleteCommand} from '@/graphql/subscriptions'
  import { getBot } from '@/graphql/queries'

  import bot from "@/components/forms/Bot"
  import command from "@/components/forms/Command"

  export default {
    name: 'Home',
    data () {
      return {
        bot: null,
        commands: []
      }
    },
    components: {
      'bot': bot,
      'command': command,

    },
    methods: {
      async getBot() {
        const bot = await API.graphql({
          query: getBot,
          variables: { id: this.$route.params.id }
        })

        // sort the Commands alphabetically
        bot.data.getBot.commands.items.sort((a, b) => {
          if(a.name < b.name) { return -1 }
          if(a.name > b.name) { return 1 }
          return 0
        })

        // assign it
        this.bot = bot.data.getBot

      },
    },
    async created() {
      this.getBot()

      this.createCommandSubscription = API.graphql(
        graphqlOperation(onCreateCommand)
      ).subscribe({
        next: () => this.getBot(),
        error: error => console.warn(error)
      })

      this.updateCommandSubscription = API.graphql(
        graphqlOperation(onUpdateCommand)
      ).subscribe({
        next: () => this.getBot(),
        error: error => console.warn(error)
      })

      this.deleteCommandSubscription = API.graphql(
        graphqlOperation(onDeleteCommand)
      ).subscribe({
        next: () => this.getBot(),
        error: error => console.warn(error)
      })
    },
    unmounted(){
      this.createCommandSubscription.unsubscribe()
      this.updateCommandSubscription.unsubscribe()
      this.deleteCommandSubscription.unsubscribe()
    }
  }

</script>
