<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="submit"
    >
      <v-text-field
        v-model="command.name"
        @keyup="command.name = command.name.toLowerCase()"
        :rules="[validationRules.required]"
        label="Command"
        hint="Don't forget the '/' for standard commands"
        prepend-icon="fa-terminal"
        class="pt-5"
      />
      <v-textarea
        outlined
        rows="3"
        auto-grow
        v-model="command.description"
        :rules="[validationRules.required]"
        label="Description"
        prepend-icon="fa-file-alt"
      />
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
            <sources :command="command"/>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <h4 class="my-5">Message</h4>
      <editor :text="command.template" @update="editorUpdate"/>
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
            @click="deleteCommand(command.id)"
          >
            Delete
          </v-btn>
        </v-row>
      </v-col>
    </v-form>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  import sources from '@/components/forms/Sources'
  import documentation from '@/components/forms/Documentation'
  import editor from '@/components/Editor'

  export default {
    components: {
      sources,
      documentation,
      editor,
    },
    props: {
      commandId: {
        type: String,
        default: null
      }
    },
    data () {
      return {
        editorText: '',
        loading: false,
        valid: false,
        advancedVisible: false,
        docVisible: false,
      }
    },
    computed: {
      ...mapGetters({
        command: 'command'
      })
    },
    methods: {
      ...mapActions([
        'getCommand',
        'updateCommand',
        'deleteCommand'
      ]),
      async submit () {
        this.loading = true
        this.command.template = this.editorText.trim() //trim whitespace
        await this.updateCommand({
          id: this.command.id,
          name: this.command.name,
          description: this.command.description,
          template: this.command.template
        })
        this.$refs.form.resetValidation()
        this.loading = false
      },
      editorUpdate(text){
        this.editorText = text
      }
    },
    async mounted() {
      this.getCommand(this.command.id)
      this.$refs.form.resetValidation()
    }
  }

</script>
