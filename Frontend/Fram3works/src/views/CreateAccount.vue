<template>
  <div class="create-account-content">
    <h2>Create Account</h2>
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
    <InputFieldUserCred
      id="confirmPassword"
      icon="lock"
      inputType="password"
      placeholderText="re-enter password"
      v-model="confirmPassword"
    />
    <button @click="createNewUser">Creat Account</button>
    <div class="sign-in">
      <p>Already have an account? <router-link to="/login">Sign In</router-link> now!</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMutation } from '@vue/apollo-composable';
import { gql } from 'graphql-tag';

// Component imports
import InputFieldUserCred from '../components/InputFieldUserCred.vue';

export default {
  name: 'CreateAccount',
  components: {
    InputFieldUserCred
  },
  setup() {
    const router = useRouter();

    // State variables
    const username = ref(null);
    const password = ref(null);
    const confirmPassword = ref(null);

    // GraphQL mutation
    const createUserMutation = gql`
      mutation CreateUser($user: UserInput!) {
        createUser(user: $user) {
          _id
          username
        }
      }
    `;

    const { mutate: createUser } = useMutation(createUserMutation);

    // Methods
    const createNewUser = () => {
      if (password.value === confirmPassword.value) {
        createUser({ user: { username: username.value, password: password.value } });
        router.push('/login');
      } else {
        alert(`Passwords did not match.`);
      }
    };

    return {
      username,
      password,
      confirmPassword,
      createNewUser
    };
  }
};
</script>

<style lang="scss" scoped>
.create-account-content {
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

.sign-in {
  font-size: 0.9em;
  color: rgba(255, 255, 255, 0.75);
  margin: 10px 0 5px;

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
</style>
