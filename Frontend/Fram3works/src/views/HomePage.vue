<template>
  <div class="home">
    <h2>Home</h2>
    <p v-if="username">Welcome back {{ username }}!</p>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'Home',
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
