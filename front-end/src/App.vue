<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <a to="/" class="white--text d-flex align-center">
        <h1 class="ml-2">
          Euler.tools Bots
        </h1>
      </a>

      <v-spacer></v-spacer>
      <div v-if="user">
        {{ user.username }}
        <v-btn
          class="ml-4"
          @click="signout"
        >
          Log Out
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
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
