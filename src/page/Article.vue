<template>
  <h1>Article</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Article',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
})
</script>

<style scoped>

</style>