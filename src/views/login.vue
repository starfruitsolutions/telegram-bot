<template>

    <v-container fill-height fluid>
      <v-row
        align="center"
        justify="center"
      >
        <amplify-authenticator/>
      </v-row>
    </v-container>
    
</template>

<script>
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
import { mapMutations } from 'vuex'

export default {
  name: 'Login',
  methods: {
    ...mapMutations({
      setUser: 'setUser'
    }),
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
