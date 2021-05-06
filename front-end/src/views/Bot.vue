<template>
  <div v-if="bot">
    <v-btn to="/" class="my-5">Go Back To Bots</v-btn>
    <h1>Bot: {{ bot.name }} </h1>
    <h4 class="mb-5">ID: {{ bot.id }}</h4>
    <bot :bot="bot"/>
    <h2 class="my-5">Commands</h2>
    <v-btn @click="addButton" color="primary" class="my-5"> {{ addVisible ? 'Done' : 'Create Command' }}</v-btn>
    <command v-if="addVisible" :bot="bot"/>
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
  import {onUpdateCommand, onDeleteCommand} from '@/graphql/subscriptions'
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
      addButton() {
        // reload bot on close
        if(this.addVisible){
          this.getBot()
        }
        this.addVisible = !this.addVisible
      },
      async getBot() {
        console.log('reloading bot')
        const bot = await API.graphql({
          query: getBot,
          variables: { id: this.$route.params.id }
        })
        this.bot = bot.data.getBot

      },
    },
    async created() {
      this.getBot()

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
      this.updateCommandSubscription.unsubscribe()
      this.deleteCommandSubscription.unsubscribe()
    }
  }

</script>
