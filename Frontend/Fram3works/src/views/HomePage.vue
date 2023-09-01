<template>
  <div class="home">
    <NavBar />
    <h3 v-if="username">Welcome back {{ username }}!</h3>
    <div v-if="frameworkIds">
      <ul v-for="(item, key) in frameworkIds">
        <li>{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, onMounted, ref, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

// Component imports
import NavBar from '../components/NavBar.vue';

export default {
  name: 'Home',
  components: {
    NavBar
  },
  setup() {
    const store = useStore();

    // Computed variables
    const username = computed(() => store.getters.getUsername);
    const Id = computed(() => store.getters.getId);

    // State variables
    const idRef = ref(Id);

    // GraphQL
    const getFramworkIdsQuery = gql`
      query GetUserFrameworks($id: ID!) {
        getUserFrameworks(_id: $id)
      }
    `;

    const { result, error } = useQuery(getFramworkIdsQuery, () => ({
      id: idRef.value
    }));

    const frameworkIds = computed(() => result.value?.getUserFrameworks ?? []);

    return {
      username,
      idRef,
      frameworkIds
    };
  }
};
</script>

<style scoped>
h3 {
  color: whitesmoke;
  padding: 10px;
}
</style>
