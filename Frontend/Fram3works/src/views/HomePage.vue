<template>
  <div class="home">
    <NavBar />
    <h2>Home</h2>
    <p v-if="username">Welcome back {{ username }}!</p>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

// Component imports
import NavBar from '../components/NavBar.vue';

export default {
  name: 'Home',
  components: {
    NavBar
  },
  setup() {
    const store = useStore();

    return {
      username: computed(() => store.state.username)
    };
  }
};
</script>

<style scoped>
h2 {
  color: whitesmoke;
}
</style>
