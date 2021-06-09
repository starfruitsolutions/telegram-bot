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
            type="submit"
            color="primary"
            :loading="loading"
            width="200"
          >
            Create
          </v-btn>
          <v-btn
            width="100"
            class="ml-10"
            @click="toggleImporter"
          >
            import
          </v-btn>
          <importer
            v-if="importerVisible"
            :visible="importerVisible"
            :bot="bot"
            @cancel="toggleImporter"
            @ok="toggleImporter"
          />
        </v-row>
      </v-col>
    </v-form>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  import importer from '@/components/Importer'

  export default {
    components: {
      importer
    },
    data () {
      return {
        form: {
          name: ''
        },
        loading: false,
        valid: false,
        importerVisible: false
      }
    },
    methods: {
      ...mapActions([
        'createCommand',
      ]),
      toggleImporter () {
        this.importerVisible = !this.importerVisible
      },
      async submit () {
        this.loading = true
        await this.createCommand({
          commandBotId: this.$route.params.id,
          name: this.form.name
        })
        this.$refs.form.reset()
        this.loading = false
      },
    },
    mounted() {
      this.$refs.form.reset()
    }
  }

</script>
