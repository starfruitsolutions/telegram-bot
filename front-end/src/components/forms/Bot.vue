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
      <v-text-field
        v-model="form.description"
        :rules="[validationRules.required]"
        label="Description"
        prepend-icon="fa-file-alt"
      />
      <v-btn
        :disabled="!valid"
        type="submit"
        class="mt-3 mb-6"
      >
        Save
      </v-btn>
    </v-form>
  </card>
</template>

<script>
  import { API } from 'aws-amplify';
  import { createBot } from '@/graphql/mutations';

  export default {
    data () {
      return {
        form: {
          name: null,
          description: null
        }
      }
    },
    methods: {
      async submit () {
        await API.graphql({
          query: createBot,
          variables: {input: this.form},
        });
        this.$refs.form.reset()
      }
    }
  }

</script>
