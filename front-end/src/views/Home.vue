<template>
  <div>
    <bot/>
    <Card v-for="bot in bots" :key="bot.id">
      <h3>{{ bot.name }}</h3>
      <p>{{ bot.description }}</p>
    </Card>
  </div>
</template>

<script>
  import { API } from 'aws-amplify';
  import { listBots } from '@/graphql/queries';
  import bot from "@/components/forms/Bot"

  export default {
    name: 'Home',
    data () {
      return {
        bots: []
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
    },
  }

</script>
