<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="submit"
    >
      <v-text-field
        v-model="command.name"
        :rules="[validationRules.required]"
        label="Name"
        prepend-icon="fa-robot"
      />
      <v-text-field
        v-model="command.arguments"
        label="Arguments"
        prepend-icon="fa-file-alt"
      />
      <sources :command="command"/>
      <h4 class="my-5">Template</h4>
      <v-textarea
        outlined
        v-model="command.template"
        :rules="[validationRules.required]"
      />
      <v-btn
        :disabled="!valid"
        type="submit"
        class="mt-3 mb-6"
      >
        Save
      </v-btn>
    </v-form>
  </div>
</template>

<script>
  import { API, graphqlOperation } from 'aws-amplify'
  import {onCreateSource} from '@/graphql/subscriptions'
  import { createCommand, updateCommand} from '@/graphql/mutations'
  import { getCommand} from '@/graphql/queries'
  import Sources from "@/components/forms/Sources"

  export default {
    components: {
      'sources': Sources
    },
    props: {
      bot: {
        type: Object,
        default: () => {}
      },
      command: {
        type: Object,
        default: () => {}
      }
    },
    data () {
      return {
        form: {
          name: null,
          arguments: null,
          template: null
        },
        valid: false
      }
    },
    methods: {
      async submit () {
        if (this.command) {
          await this.update()
        }
        else {
          await this.create()
        }
      },
      async create () {
        await API.graphql({
          query: createCommand,
          variables: {
            input: {
              commandBotId: this.bot.id,
              name: this.command.name,
              arguments: this.command.arguments,
              template: this.command.template
            }
          }
        })
        //get the command id
      },
      async update () {
        await API.graphql({
          query: updateCommand,
          variables: {
            input: {
              id: this.command.id,
              name: this.command.name,
              arguments: this.command.arguments,
              template: this.command.template
            }
          }
        })
      },
      async getCommand(id) {
        const command = await API.graphql({
          query: getCommand,
          variables: { id: id }
        })
        console.log(command.data.getCommand)
        this.command = command.data.getCommand
      },
    },
    created() {
      this.subscription = API.graphql(
        graphqlOperation(onCreateSource)
      ).subscribe({
        next: () => {
          this.getCommand(this.command.id)
        },
        error: error => console.warn(error)
      })
    },
    mounted() {
      if(this.command){
        this.getCommand(this.command.id)
      }
    }
  }

</script>
