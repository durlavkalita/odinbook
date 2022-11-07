<template>
  <div>
    <NavbarVue></NavbarVue>
    <router-view></router-view>
  </div>
</template>

<script>
import NavbarVue from './components/Navbar.vue';

export default {
  components: {
    NavbarVue
  },
  created() {
    this.$store.dispatch('tryLogin');
    this.$store.dispatch('people/loadPeople');
  }
}

</script>