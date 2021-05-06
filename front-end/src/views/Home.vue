<template>
  <div>
    <v-btn @click="addVisible = !addVisible" color="primary" class="my-5"> {{ addVisible ? 'Close' : 'Create Bot' }}</v-btn>
    <bot v-if="addVisible"/>
    <Card v-for="bot in bots" :key="bot.id">
      <h3>{{ bot.name }}</h3>
      <p>{{ bot.description }}</p>
      <v-col>
        <v-row>
          <v-btn
            :to="'bot/' + bot.id"
            class="my-5 "
          >
            Edit
          </v-btn>
          <v-spacer/>
          <v-btn
            color="red"
            dark
            class="my-5"
            @click="deleteBot(bot.id)"
          >
            Delete
          </v-btn>
        </v-row>
      </v-col>
    </Card>
  </div>
</template>

<script>
  import { API, graphqlOperation } from 'aws-amplify'
  import { listBots } from '@/graphql/queries'
  import { onCreateBot } from '@/graphql/subscriptions'
  import { deleteBot } from '@/graphql/mutations'
  import bot from "@/components/forms/Bot"

  export default {
    name: 'Home',
    data () {
      return {
        bots: [],
        subscription: null,
        addVisible: false
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
      },
      async deleteBot (id) {
        let confirmation = confirm('Are you sure you want to delete this?')
        if (confirmation) {
          await API.graphql({
            query: deleteBot,
            variables: {
              input: {id: id}
            }
          })
          this.getBots()
        }
      },
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
