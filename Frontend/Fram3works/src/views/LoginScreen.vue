<template>
  <div class="login-content">
    <h2>Login</h2>
    <InputFieldUserCred
      id="username"
      icon="mail"
      inputType="text"
      placeholderText="username"
      v-model="username"
    />
    <InputFieldUserCred
      id="password"
      icon="lock"
      inputType="password"
      placeholderText="password"
      v-model="password"
    />
    <button @click="getCredentials()">Submit</button>
    <div class="forgot-pwd">
      <router-link to="/forgot_password">Forgot password</router-link>
    </div>
    <div class="create-account">
      <p>Don't have an account? <router-link to="/create_account">Sign up</router-link> now!</p>
    </div>
    <div v-if="error" class="invalid-login">
      <p>Username and password combination incorrect, please try again.</p>
    </div>
  </div>
</template>

<script>
import { gql } from 'graphql-tag';
import { ref, computed, watch } from 'vue';
import { useLazyQuery } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

// Component imports
import InputFieldUserCred from '../components/InputFieldUserCred.vue';

export default {
  name: 'LoginScreen',
  components: {
    InputFieldUserCred
  },
  setup() {
    // Initialise variables
    const username = ref(null);
    const password = ref(null);

    const router = useRouter();
    const store = useStore();

    // GraphQL Methods
    const { result, load, refetch, error } = useLazyQuery(
      gql`
        query GetUserByName($name: String!) {
          getUserByName(name: $name) {
            username
            password
            _id
          }
        }
      `,
      () => ({ name: username.value })
    );

    const userCredentials = computed(() => result.value?.getUserByName ?? []);

    watch(userCredentials, (data) => {
      if (data && data.username == username.value && data.password == password.value) {
        store.dispatch('updateId', data._id);
        store.dispatch('updateUsername', data.username);
        router.push('/');
      }
    });

    const getCredentials = () => {
      load() || refetch();
    };

    // Data and methods to be used in template
    return {
      username,
      password,
      error,
      getCredentials
    };
  }
};
</script>

<style lang="scss" scoped>
.login-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  flex-direction: column;

  h1 {
    color: whitesmoke;
  }

  h2 {
    color: whitesmoke;
    text-align: center;
  }

  button {
    width: 300px;
    height: 30px;
    border-radius: 35px;
    background-color: rgb(0, 255, 128, 0.8);
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 0.8em;
    font-weight: 550;

    &:hover {
      background-color: rgb(0, 255, 128, 0.9);
    }
  }
}

.forgot-pwd {
  margin: 10px 5px;

  a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.8em;

    &:hover {
      text-decoration: underline;
      color: rgba(255, 255, 255, 0.95);
    }
  }
}

.create-account {
  font-size: 0.9em;
  color: rgba(255, 255, 255, 0.75);
  margin: 5px 0 5px;

  a {
    text-decoration: none;
    color: rgb(0, 255, 128, 0.8);
    font-size: 0.9em;

    &:hover {
      text-decoration: underline;
      color: rgb(0, 255, 128, 0.9);
    }
  }
}

.invalid-login {
  font-size: 0.9em;
  color: rgb(223, 48, 48);
  margin: 5px 0;
}
</style>
