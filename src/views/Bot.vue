<template>
  <div v-if="bot">
    <v-btn to="/" class="my-5">Go Back To Bots</v-btn>
    <h1>Bot: {{ bot.name }} </h1>
    <h4 class="mb-5">ID: {{ bot.id }}</h4>
    <bot :bot="bot" class="mb-15"/>
    <h1>Commands</h1>
    <command :bot="bot" class="pa-5"/>
    <v-expansion-panels accordion focusable>
      <v-expansion-panel
        v-for="command in bot.commands"
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
  import { mapActions, mapGetters } from 'vuex'

  import bot from "@/components/forms/Bot"
  import command from "@/components/forms/Command"

  export default {
    name: 'Home',
    components: {
      'bot': bot,
      'command': command
    },
    computed: {
      ...mapGetters({
        bot: 'bot'
      })
    },
    methods: {
      ...mapActions([
        'getBot',
        'subscribeCommands',
        'unsubscribeCommands'
      ])
    },
    created() {
      this.getBot(this.$route.params.id)
      this.subscribeCommands()
    },
    unmounted(){
      this.unsubscribeCommands()
    }
  }

</script>
