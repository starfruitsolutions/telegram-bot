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
        hint="Don't forget the '/' for standard commands"
        prepend-icon="fa-robot"
      />
      <template v-if="form.id">
        <sources :command="form"/>
        <h4 class="my-5">Template</h4>
        <v-expansion-panels>
          <v-expansion-panel class="mb-5">
            <v-expansion-panel-header>
              <h4>Documentation</h4>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div v-pre>
                <h4> Templating </h4>
                <p>
                  Templating can be used in data source fields and the final message template.
                </p>
                <p>
                   You can render a variable value in its place by reference using double braces:
                   <pre>{{ variable }}</pre>
                </p>
                <p>
                  If a variable has special characters, it can be rendered without escaping using:
                  <pre>{{{ variable }}}</pre>
                  However, be conscious that this poses an increased injection risk.
                </p>

                <h4> Available Data </h4>
                <p>
                  Bot command arguments are at:
                  <pre>{{ args.[index] }}</pre>
                  starting with the command itself at:
                  <pre>{{ args.0 }}</pre>
                  Data sources can be referenced by their assigned name.
                  <pre>{{ sources.[name] }}</pre><br>
                </p>

                <h4> Formatters </h4>
                <p>
                  Formatters allow manipulation of the data.
                  <pre>{{ variable | formatter }}</pre>
                  They can be strung together in chains.
                  <pre>{ variable | formatter1 | formatter2 | ... }}</pre>
                  Currently only basic arithmetic functions are supported( add, subtract, multiply, divide)<br>
                  <pre>{{ args.1 | add: args.2 }}</pre>
                  will add two arguments together<br>
                </p>

                <h4> Documentation </h4>
                <p>
                  Templating documentation: <a href="https://github.com/janl/mustache.js" target="_blank">moustache.js Github</a><br>
                  Formatter documentation: <a href="http://jvitela.github.io/mustache-wax/" target="_blank">moustache-wax</a>
                </p>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-textarea
          v-model="form.template"
          :rules="[validationRules.required]"
          outlined
        />
      </template>
      <v-col>
        <v-row class="mt-2 mb-6">
          <v-btn
            type="submit"
            color="primary"
          >
            {{ form.id ? 'Save' : 'Create' }}
          </v-btn>
          <v-spacer/>
          <v-btn
            v-if="form.id"
            color="red"
            dark
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
  import {onCreateSource, onDeleteSource} from '@/graphql/subscriptions'
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
        var command = await API.graphql({
          query: createCommand,
          variables: {
            input: {
              commandBotId: this.bot.id,
              name: this.form.name,
              template: this.form.template
            }
          }
        })
        this.form = command.data.createCommand
        this.$refs.form.reset()
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
      async getCommand() {
        const command = await API.graphql({
          query: getCommand,
          variables: { id: this.form.id }
        })
        this.form = command.data.getCommand
        this.$refs.form.reset()
      },
    },
    created() {
      this.createSubscription = API.graphql(
        graphqlOperation(onCreateSource)
      ).subscribe({
        next: () => {
          this.getCommand()
        },
        error: error => console.warn(error)
      })

      this.deleteSubscription = API.graphql(
        graphqlOperation(onDeleteSource)
      ).subscribe({
        next: () => {
          this.getCommand()
        },
        error: error => console.warn(error)
      })
    },
    mounted() {
      this.form = this.command
      if(this.command.id){
        this.getCommand()
      }
      this.$refs.form.reset()
    },
    unmounted(){
      this.createSubscription.unsubscribe()
      this.deleteSubscription.unsubscribe()
    }
  }

</script>
