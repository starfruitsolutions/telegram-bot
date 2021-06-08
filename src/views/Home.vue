<template>
  <div>
    <v-btn @click="addVisible = !addVisible" color="primary" class="my-5"> {{ addVisible ? 'Close' : 'Create Bot' }}</v-btn>
    <bot v-if="addVisible"/>
    <Card v-for="bot in bots" :key="bot.id">
      <v-col>
        <v-row align="baseline">
        <h1>{{ bot.name }} </h1>
        <v-spacer/>
        <h3>{{ bot.id }}</h3>
        </v-row>
      </v-col>
      <p class="my-5">{{ bot.description }}</p>
      <v-col>
        <v-row class="my-5">
          <v-btn
            :to="'bot/' + bot.id"
          >
            Edit
          </v-btn>
          <v-spacer/>
          <v-btn
            color="red"
            dark
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
  import { mapActions, mapGetters } from 'vuex'
  import bot from "@/components/forms/Bot"

  export default {
    name: 'Home',
    data () {
      return {
        addVisible: false
      }
    },
    components: {
      'bot': bot
    },
    computed: {
      ...mapGetters({
        bots: 'bots'
      })
    },
    methods: {
      ...mapActions([
        'getBots',
        'deleteBot',
        'subscribeBots'
      ])
    },
    async created() {
      this.getBots()
      this.subscribeBots()
    },
    unmounted(){
      this.subscription.unsubscribe()
    }
  }

</script>
