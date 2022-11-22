<template>
  <router-link :to="fetchProfileUrl">
      <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: ['to'],
  computed: {
    fetchProfileUrl() {
      const url = `/${this.to.name}/${this.to.params.userId}`;
      return url;
    }
  },
}
</script>