<template>
  <Modal
    :visible="visible"
    title="Select commands to import"
    ok-text="import"
    :ok-visible="(selection)"
    cancel-visible
    @ok="ok"
    @cancel="cancel"
  >
    {{selectedCommands}}
    <v-treeview
      v-model="selection"
      :items="items"
      selectable
      selection-type="leaf"
    />
  </Modal>
</template>

<script>
  import { API } from 'aws-amplify'
  import { listBotsWithCommands } from '@/graphql/queries'
  import { createCommand, createSource} from '@/graphql/mutations'

  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      bot: {
        type: String,
        default: ''
      }
    },
    data: () => ({
      bots: {},
      selection: null
    }),
    computed: {
      items(){
        if(!this.bots.length){
          return false
        }
        return this.bots.map(bot => {
          return {
            id: bot.id,
            name: `${bot.name} : ${bot.id}`,
            children: bot.commands.items
          }
        })
      },
      selectedCommands() {
        if(!this.bots || !this.selection){
          return []
        }
        let commands = {}
        this.bots.forEach(bot => {
          bot.commands.items.forEach(command => {
            commands[command.id] = command
          })
        })
        return this.selection.map(selection => {
          let command = commands[selection]
          return {
            name: command.name,
            description: command.description,
            template: command.template,
            sources: command.sources.items
          }
        })
      }
    },
    methods: {
      async getBots() {
        const bots = await API.graphql({
          query: listBotsWithCommands
        })
        this.bots = bots.data.listBots.items
      },
      ok () {
        // generate keyed list of commands
        let commands = {}
        this.bots.forEach(bot => {
          bot.commands.items.forEach(command => {
            commands[command.id] = command
          })
        })
        // generate list of selected commands
        let selectedCommands = this.selection.map(selection => {
          let command = commands[selection]
          return {
            name: command.name,
            description: command.description,
            template: command.template,
            sources: command.sources.items
          }
        })

        // create commands
        selectedCommands.forEach(command => {
          API.graphql({
            query: createCommand,
            variables: {
              input: {
                commandBotId: this.bot.id,
                name: command.name,
                description: command.description,
                template: command.template
              }
            }
          }).then(response => {
            //create the sources
            console.log(response.data.createCommand.id)
            let commandId = response.data.createCommand.id
            command.sources.forEach(source => {
              console.log(response)
              API.graphql({
                query: createSource,
                variables: {
                  input: {
                    sourceCommandId: commandId,
                    ...source
                  }
                }
              })
            })
          })
        })
        //send em
        this.$emit('ok', selectedCommands)
      },
      cancel () {
        this.$emit('cancel')
      }
    },
    mounted() {
      this.getBots()
    }
  }
</script>
