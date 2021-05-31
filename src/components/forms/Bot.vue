<template>
  <Card>
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
      <v-textarea
        outlined
        rows="3"
        auto-grow
        v-model="form.description"
        :rules="[validationRules.required]"
        label="Description"
        prepend-icon="fa-file-alt"
      />
      <v-btn
        :disabled="!valid"
        :loading="loading"
        type="submit"
        color="primary"
        class="mt-3 mb-6"
      >
        Save
      </v-btn>
    </v-form>
  </card>
</template>

<script>
  import { API } from 'aws-amplify';
  import { createBot, updateBot } from '@/graphql/mutations';

  export default {
    props: {
      bot: {
        type: Object,
        default: () => {}
      },
    },
    data () {
      return {
        form: {
          name: null,
          description: null
        },
        loading: false,
        valid: false
      }
    },
    methods: {
      async submit () {
        this.loading = true
        if (this.bot) {
          await this.update()
        }
        else {
          await this.create()
        }
        this.loading = false
      },
      async create () {
        await API.graphql({
          query: createBot,
          variables: {input: this.form}
        })
        this.$refs.form.reset()
      },
      async update () {
        await API.graphql({
          query: updateBot,
          variables: {input: {...this.form, id: this.bot.id}}
        })
      }
    },
    mounted() {
      if(this.bot){
        this.form.name = this.bot.name
        this.form.description = this.bot.description
      }
    }
  }

</script>
