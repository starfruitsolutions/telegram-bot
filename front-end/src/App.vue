<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <a to="/" class="white--text d-flex align-center">
        <h1 class="ml-2">
          Euler.tools bots
        </h1>
      </a>

      <v-spacer></v-spacer>
      <div v-if="user">
        {{ user.username }}
        <v-btn
          @click="signout"
        >
          Log Out
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { Auth } from 'aws-amplify';
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  methods: {
    ...mapMutations({
      setUser: 'setUser'
    }),
    async signout () {
      try {
        await Auth.signOut();
        this.setUser(null)
        this.$router.push('/login')
      } catch (error) {
        console.log('error signing out: ', error);
      }
    }
  }
}
</script>
