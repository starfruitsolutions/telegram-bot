<template>

    <v-container fill-height fluid>
      <v-row
        align="center"
        justify="center"
      >
        <amplify-authenticator/>

        <!--
        <v-card
          width="400"
          class="pa-4"
        >
          <v-container>
            <v-form
              ref="form"
              v-model="valid"
              @submit.prevent="submit"
            >
              <v-text-field
                v-model="username"
                :rules="[validationRules.required]"
                label="Username"
                autocomplete="username"
                prepend-icon="fa-user"
              />
              <v-text-field
                v-model="password"
                type='password'
                :rules="[validationRules.required]"
                label="Password"
                autocomplete="current-password"
                prepend-icon="fa-unlock-alt"
              />
              <v-btn
                :disabled="!valid"
                type="submit"
                width="100%"
                class="mt-3 mb-6"
              >
                Submit
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      -->
      </v-row>
    </v-container>
</template>

<script>
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
import { mapMutations } from 'vuex'

export default {
  name: 'Login',
  /*
  data () {
    return {
      valid: false,
      username: null,
      password: null
    }
  },
  */
  methods: {
    ...mapMutations({
      setUser: 'setUser'
    }),
    /*
    async submit () {
      try {
        const user = await Auth.signIn(this.username, this.password)
        this.setUser(user)
        this.$router.push('/')
      } catch (error) {
        console.log('error signing in', error)
      }
    }
    */
  },
  created() {
    // authentication state managament
    onAuthUIStateChange((state, user) => {
      // set current user and load data after login
      if (state === AuthState.SignedIn) {
        this.setUser(user)
        this.$router.push('/')
      }
    })
  }
}
</script>
