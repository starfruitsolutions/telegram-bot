<template>
  <v-card
    :class="{ 'mb-5': margins}"
    class="card elevation-3"
  >
    <p :class="{ 'pa-10': padding}">
      <slot/>
    </p>
  </v-card>
</template>

<script>
export default {
  props: {
    padding: {
      type: Boolean,
      default: true
    },
    margins: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      expanded: false
    }
  }
}
</script>
