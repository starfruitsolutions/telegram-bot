<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="submit"
    >
      <v-col>
        <v-row align="center">
          <v-text-field
            v-model="form.name"
            @keyup="form.name = form.name.toLowerCase()"
            :rules="[validationRules.required]"
            label="Command"
            hint="Don't forget the '/' for standard commands"
            prepend-icon="fa-terminal"
            class="pt-5"
          />
          <v-btn
            v-if="!form.id"
            type="submit"
            color="primary"
            :loading="loading"
            width="200"
          >
            Create
          </v-btn>
        </v-row>
      </v-col>
      <template v-if="form.id">
        <v-expansion-panels focusable>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <h4>Advanced Options +</h4>
            </v-expansion-panel-header>
            <v-expansion-panel-content class=pa-5>
              <v-btn @click="docVisible = !docVisible"> Documentation</v-btn>
              <template v-if="docVisible">
                <div v-pre class="mt-5">
                  <h4>Data Sources</h4>
                  <br>
                  <p>A data source is a connection to an external rest API.<p>
                    <ul>
                      <li>The name field is just a label used to reference the data in the final message template.</li>
                      <li>Select the method and enter the url for the api endpoint</li>
                      <li>The body accepts the standard json format</li>
                    </ul>
                  <p>
                    Template variables from the command ( {{ args.[index] }} ) are permitted in the data source URL and body,
                    but be careful not to create opportunities for injection attacks.
                  </p>
                  <h4> Templating </h4>
                  <br>
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
                  <br>
                  <p>
                    All data uses dot notation, including arrays.
                  </p>
                  <p>
                    Bot command arguments are at:
                    <pre>{{ args.[index] }}</pre>
                    starting with the command itself at:
                    <pre>{{ args.0 }}</pre>
                    The <a href="https://core.telegram.org/bots/api#update" target="_blank">message</a> from the telegram update can be accessed at:
                    <pre>{{ message.[field]... }}</pre>
                    Data sources can be referenced by their assigned name.
                    <pre>{{ sources.[name] }}</pre><br>
                  </p>

                  <h4> Formatters </h4>
                  <br>
                  <p>
                    Formatters allow manipulation of the data.
                    <pre>{{ variable | formatter }}</pre>
                    They can be strung together in chains.
                    <pre>{ variable | formatter1 | formatter2 | ... }}</pre>
                    Currently only basic arithmetic functions are supported( add, subtract, multiply, divide)<br>
                    <pre>{{ args.1 | add: args.2 }}</pre>
                    will add two arguments together<br>
                  </p>

                  <h4> Additional Documentation </h4>
                  <br>
                  <p>
                    Bot documentation:  <a href="https://core.telegram.org/bots/api" target="_blank">Telegram Bot API</a><br>
                    Templating documentation: <a href="https://github.com/janl/mustache.js" target="_blank">moustache.js Github</a><br>
                    Formatter documentation: <a href="http://jvitela.github.io/mustache-wax/" target="_blank">moustache-wax</a>
                  </p>
                </div>
              </template>
              <sources :command="form"/>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <h4 class="my-5">Message</h4>
        <v-textarea
          v-model="form.template"
          :rules="[validationRules.required]"
          outlined
        />
        <v-col>
          <v-row class="mt-2 mb-6">
            <v-btn
              type="submit"
              color="primary"
              :loading="loading"
            >
              Save
            </v-btn>
            <v-spacer/>
            <v-btn
              color="red"
              dark
              @click="deleteCommand"
            >
              Delete
            </v-btn>
          </v-row>
        </v-col>
      </template>
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
        loading: false,
        valid: false,
        advancedVisible: false,
        docVisible: false
      }
    },
    methods: {
      async submit () {
        this.loading = true
        if (this.command.id) {
          await this.update()
        }
        else {
          await this.create()
        }
        this.loading = false
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
        this.form = this.command
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
      this.$refs.form.resetValidation()
    },
    unmounted(){
      this.createSubscription.unsubscribe()
      this.deleteSubscription.unsubscribe()
    }
  }

</script>
