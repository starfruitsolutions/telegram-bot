<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="submit"
    >
      <v-text-field
        v-model="form.name"
        :rules="[validationRules.required]"
        label="Name"
        prepend-icon="fa-robot"
      />
      <sources :command="form"/>
      <h4 class="my-5">Template</h4>
      <v-textarea
        v-model="form.template"
        :rules="[validationRules.required]"
        outlined
      />
      <v-col>
        <v-row>
          <v-btn
            type="submit"
            class="mt-3 mb-6"
          >
            Save
          </v-btn>
          <v-spacer/>
          <v-btn
            color="red"
            dark
            class="mt-3 mb-6"
            @click="deleteCommand"
          >
            Delete
          </v-btn>
        </v-row>
      </v-col>
    </v-form>
  </div>
</template>

<script>
  import { API, graphqlOperation } from 'aws-amplify'
  import {onCreateSource} from '@/graphql/subscriptions'
  import { createCommand, updateCommand, deleteCommand} from '@/graphql/mutations'
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
        default: () => {
          return{
            name: '',
            sources: {},
            template: ''
          }
        }
      }
    },
    data () {
      return {
        form: {},
        valid: false
      }
    },
    methods: {
      async submit () {
        if (this.command.id) {
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
              name: this.form.name,
              template: this.form.template
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
              id: this.form.id,
              name: this.form.name,
              template: this.form.template
            }
          }
        })
      },
      async deleteCommand () {
        let confirmation = confirm('Are you sure you want to delete this?')
        if (confirmation) {
          await API.graphql({
            query: deleteCommand,
            variables: {
              input: {id: this.form.id}
            }
          })
        }
      },
      async getCommand(id) {
        const command = await API.graphql({
          query: getCommand,
          variables: { id: id }
        })
        this.form = command.data.getCommand
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
      this.form = this.command
      if(this.command.id){
        this.getCommand(this.command.id)
      }
    }
  }

</script>
