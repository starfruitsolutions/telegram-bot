<template>
  <div>
    <bot/>
    <Card v-for="bot in bots" :key="bot.id">
      <h3>{{ bot.name }}</h3>
      <p>{{ bot.description }}</p>
      <v-btn :to="'bot/' + bot.id">Edit</v-btn>
    </Card>
  </div>
</template>

<script>
  import { API, graphqlOperation } from 'aws-amplify'
  import {onCreateBot} from '@/graphql/subscriptions'
  import { listBots } from '@/graphql/queries'
  import bot from "@/components/forms/Bot"

  export default {
    name: 'Home',
    data () {
      return {
        bots: [],
        subscription: null
      }
    },
    components: {
      'bot': bot
    },
    methods: {
      async getBots() {
        const bots = await API.graphql({
          query: listBots
        })
        this.bots = bots.data.listBots.items
      }
    },
    async created() {
      this.getBots()
      this.subscription = API.graphql(
        graphqlOperation(onCreateBot)
      ).subscribe({
        next: ({ value }) => {
          this.bots.push(value.data.onCreateBot)
        },
        error: error => console.warn(error)
      })
    },

  }

</script>
