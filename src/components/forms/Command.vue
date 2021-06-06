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
                <documentation/>
              </template>
              <sources :command="form"/>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <h4 class="my-5">Message</h4>
        <editor :text="form.template" @update="editorUpdate"/>
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
  import sources from '@/components/forms/Sources'
  import documentation from '@/components/forms/Documentation'
  import editor from '@/components/Editor'

  export default {
    components: {
      sources,
      documentation,
      editor
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
        editorText: '',
        loading: false,
        valid: false,
        advancedVisible: false,
        docVisible: false
      }
    },
    methods: {
      async submit () {
        this.loading = true
        this.form.template = this.editorText.trim() //trim whitespace
        console.log(this.form.template)
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
      editorUpdate(text){
        this.editorText = text
      }
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
