<template>
  <div v-if="bot">
    <v-btn to="/" class="my-5">Go Back To Bots</v-btn>
    <h1>Bot: {{ bot.name }} </h1>
    <h4 class="mb-5">ID: {{ bot.id }}</h4>
    <bot :bot="bot" class="mb-15"/>
    <h1>Commands</h1>
    <create-command class="pa-5"/>
    <v-expansion-panels accordion focusable>
      <v-expansion-panel
        v-for="command in bot.commands"
        :key="command.id"
      >
        <v-expansion-panel-header @click="setCommand(command)">
          <h3>{{ command.name }}</h3>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <command/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-btn to="/" class="my-5">Go Back To Bots</v-btn>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'

  import Bot from "@/components/forms/Bot"
  import Command from "@/components/forms/Command"
  import CreateCommand from "@/components/forms/CreateCommand"

  export default {
    name: 'Home',
    components: {
      Bot,
      Command,
      CreateCommand
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
      ]),
      ...mapMutations([
        'setCommand'
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
