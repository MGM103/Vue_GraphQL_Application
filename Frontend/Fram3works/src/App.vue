<template>
  <div id="main-content-fram3works">
    <div class="container">
      <template v-if="!isUserCreds()">
        <NavBar />
      </template>
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'HomePage',

  components: {
    NavBar
  },

  methods: {
    isUserCreds() {
      const isLogin = this.$route.path === '/login' || this.$route.path === '/create_account';
      return isLogin;
    }
  }
};
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100%;
  background: linear-gradient(
    to bottom,
    rgba(65, 66, 65, 0.8),
    rgba(46, 50, 52, 0.85),
    rgba(39, 44, 47, 0.9)
  );
}
</style>
